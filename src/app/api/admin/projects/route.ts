import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import type { Project } from "@/content/profile";

const projectsFilePath = path.join(process.cwd(), "src/content/projects.json");
const ADMIN_PIN = process.env.ADMIN_PIN || "somya";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "somyamoonat";
const GITHUB_REPO = process.env.GITHUB_REPO || "portfolio";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const GITHUB_FILE_PATH = "src/content/projects.json";

interface GitHubContentResponse {
  sha: string;
  content: string;
  encoding: string;
}

// Read projects directly from GitHub API repo (if token exists) or fallback to local file
async function getGitHubProjects(): Promise<{ sha: string; projects: Project[] } | null> {
  if (!GITHUB_TOKEN) return null;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-Admin-Sync",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.warn("GitHub fetch contents returned non-200:", res.status);
      return null;
    }

    const data: GitHubContentResponse = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return { sha: data.sha, projects: parsed };
    }
    return null;
  } catch (err) {
    console.error("Error fetching projects from GitHub API:", err);
    return null;
  }
}

// Commit updated projects directly to GitHub main branch via GitHub REST API
async function commitProjectsToGitHub(
  projects: Project[],
  commitMessage: string
): Promise<{ success: boolean; sha?: string; error?: string }> {
  if (!GITHUB_TOKEN) {
    return { success: false, error: "GITHUB_TOKEN not configured" };
  }

  try {
    // 1. Get the current file SHA from GitHub
    const current = await getGitHubProjects();
    const base64Content = Buffer.from(JSON.stringify(projects, null, 2), "utf8").toString("base64");

    const bodyPayload: Record<string, string> = {
      message: commitMessage,
      content: base64Content,
      branch: GITHUB_BRANCH,
    };

    if (current?.sha) {
      bodyPayload.sha = current.sha;
    }

    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
          "User-Agent": "Portfolio-Admin-Sync",
        },
        body: JSON.stringify(bodyPayload),
      }
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error("GitHub commit failed:", res.status, errBody);
      return { success: false, error: `GitHub API error: ${res.status}` };
    }

    const data = await res.json();
    return { success: true, sha: data.commit?.sha };
  } catch (err: unknown) {
    console.error("Failed to commit projects to GitHub:", err);
    return { success: false, error: String(err) };
  }
}

async function readProjects(): Promise<Project[]> {
  // 1. Try reading from GitHub first if configured (ensures production & local consistency)
  const remote = await getGitHubProjects();
  if (remote?.projects && Array.isArray(remote.projects) && remote.projects.length > 0) {
    return remote.projects;
  }

  // 2. Fallback to reading from local JSON file
  try {
    const raw = await fs.readFile(projectsFilePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading projects.json locally:", error);
    return [];
  }
}

async function writeProjects(
  projects: Project[],
  commitMessage: string
): Promise<{ committed: boolean; error?: string }> {
  // 1. Always attempt local write (for local dev work)
  try {
    await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2), "utf8");
  } catch (fsErr) {
    console.warn("Local fs.writeFile skipped (read-only environment or missing dir):", fsErr);
  }

  // 2. Commit to GitHub repository so changes persist permanently and Vercel redeploys
  if (GITHUB_TOKEN) {
    const gitHubResult = await commitProjectsToGitHub(projects, commitMessage);
    return { committed: gitHubResult.success, error: gitHubResult.error };
  }

  return { committed: false };
}

function verifyAuth(request: Request): boolean {
  const pin = request.headers.get("x-admin-pin");
  return pin === ADMIN_PIN;
}

// GET all projects (always up to date)
export async function GET() {
  const projects = await readProjects();
  return NextResponse.json({
    success: true,
    projects,
    source: GITHUB_TOKEN ? "github" : "local",
  });
}

// POST: Add a new project
export async function POST(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized: Invalid PIN" }, { status: 401 });
  }

  try {
    const newProject: Project = await request.json();
    if (!newProject.title || !newProject.slug) {
      return NextResponse.json({ success: false, error: "Title and slug are required" }, { status: 400 });
    }

    const projects = await readProjects();
    const existingIndex = projects.findIndex((p) => p.slug === newProject.slug);

    if (existingIndex !== -1) {
      projects[existingIndex] = { ...projects[existingIndex], ...newProject };
    } else {
      projects.unshift(newProject);
    }

    const commitMessage = `chore(content): add/update project '${newProject.title}' [via admin]`;
    const result = await writeProjects(projects, commitMessage);

    revalidatePath("/");
    revalidatePath(`/work/${newProject.slug}`);

    return NextResponse.json({
      success: true,
      project: newProject,
      projects,
      committed: result.committed,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json({ success: false, error: "Failed to save project" }, { status: 500 });
  }
}

// PUT: Update an existing project
export async function PUT(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized: Invalid PIN" }, { status: 401 });
  }

  try {
    const updatedProject: Project = await request.json();
    if (!updatedProject.slug) {
      return NextResponse.json({ success: false, error: "Project slug is required" }, { status: 400 });
    }

    const projects = await readProjects();
    const index = projects.findIndex((p) => p.slug === updatedProject.slug);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    projects[index] = { ...projects[index], ...updatedProject };

    const commitMessage = `chore(content): update project '${updatedProject.title}' [via admin]`;
    const result = await writeProjects(projects, commitMessage);

    revalidatePath("/");
    revalidatePath(`/work/${updatedProject.slug}`);

    return NextResponse.json({
      success: true,
      project: projects[index],
      projects,
      committed: result.committed,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 });
  }
}

// DELETE: Remove a project by slug
export async function DELETE(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized: Invalid PIN" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ success: false, error: "Project slug is required" }, { status: 400 });
    }

    const projects = await readProjects();
    const targetProject = projects.find((p) => p.slug === slug);
    const filtered = projects.filter((p) => p.slug !== slug);

    if (filtered.length === projects.length) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    const commitMessage = `chore(content): remove project '${targetProject?.title || slug}' [via admin]`;
    const result = await writeProjects(filtered, commitMessage);

    revalidatePath("/");
    revalidatePath(`/work/${slug}`);

    return NextResponse.json({
      success: true,
      projects: filtered,
      committed: result.committed,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 });
  }
}
