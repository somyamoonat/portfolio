import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import type { Project } from "@/content/profile";

const projectsFilePath = path.join(process.cwd(), "src/content/projects.json");
const ADMIN_PIN = process.env.ADMIN_PIN || "somya";

async function readProjects(): Promise<Project[]> {
  try {
    const raw = await fs.readFile(projectsFilePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading projects.json:", error);
    return [];
  }
}

async function writeProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2), "utf8");
}

function verifyAuth(request: Request): boolean {
  const pin = request.headers.get("x-admin-pin");
  return pin === ADMIN_PIN;
}

// GET all projects
export async function GET() {
  const projects = await readProjects();
  return NextResponse.json({ success: true, projects });
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
      // Update if slug already exists
      projects[existingIndex] = { ...projects[existingIndex], ...newProject };
    } else {
      // Add to beginning of projects
      projects.unshift(newProject);
    }

    await writeProjects(projects);
    revalidatePath("/");
    revalidatePath(`/work/${newProject.slug}`);

    return NextResponse.json({ success: true, project: newProject, projects });
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
    await writeProjects(projects);

    revalidatePath("/");
    revalidatePath(`/work/${updatedProject.slug}`);

    return NextResponse.json({ success: true, project: projects[index], projects });
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
    const filtered = projects.filter((p) => p.slug !== slug);

    if (filtered.length === projects.length) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    await writeProjects(filtered);
    revalidatePath("/");
    revalidatePath(`/work/${slug}`);

    return NextResponse.json({ success: true, projects: filtered });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 });
  }
}
