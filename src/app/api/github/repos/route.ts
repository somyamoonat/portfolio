import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_OWNER || "somyamoonat";

export interface GitHubRepoItem {
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  pushedAt: string;
  createdAt: string;
  isFork: boolean;
  isArchived: boolean;
}

export async function GET(request: Request) {
  // Accessing request URL ensures Next.js marks route as dynamic
  const { searchParams } = new URL(request.url);
  const requestedLimit = parseInt(searchParams.get("limit") || "100", 10);
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Somya-Moonat-Portfolio-Live-Sync",
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=${Math.min(requestedLimit, 100)}`,
      {
        headers,
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.warn("GitHub repos fetch error:", res.status, errText);
      return NextResponse.json(
        { success: false, error: `GitHub API error: ${res.status}` },
        { status: res.status }
      );
    }

    interface RawGitHubRepo {
      name: string;
      full_name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      language: string | null;
      topics: string[] | null;
      stargazers_count: number;
      forks_count: number;
      pushed_at: string;
      created_at: string;
      fork: boolean;
      archived: boolean;
    }

    const rawRepos: RawGitHubRepo[] = await res.json();

    const formatted: GitHubRepoItem[] = rawRepos.map((repo) => ({
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || "Open-source repository by Somya Moonat.",
      url: repo.html_url,
      homepage: repo.homepage || "",
      language: repo.language || "Software",
      topics: repo.topics || [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      pushedAt: repo.pushed_at,
      createdAt: repo.created_at,
      isFork: repo.fork,
      isArchived: repo.archived,
    }));

    return NextResponse.json({
      success: true,
      username: GITHUB_USERNAME,
      totalCount: formatted.length,
      repos: formatted,
    });
  } catch (error) {
    console.error("Error fetching live GitHub repositories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to connect to GitHub" },
      { status: 500 }
    );
  }
}
