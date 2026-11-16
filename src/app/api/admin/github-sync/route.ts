import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/somyamoonat/repos?sort=updated&per_page=50", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Somya-Portfolio-Sync",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, error: "Failed to fetch from GitHub" }, { status: res.status });
    }

    const repos = await res.json();
    const formatted = repos.map((repo: {
      name: string;
      description: string | null;
      html_url: string;
      language: string | null;
      topics: string[];
      stargazers_count: number;
      updated_at: string;
      fork: boolean;
      homepage: string | null;
    }) => ({
      name: repo.name,
      description: repo.description || "",
      url: repo.html_url,
      homepage: repo.homepage || "",
      language: repo.language || "TypeScript",
      topics: repo.topics || [],
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
      isFork: repo.fork,
    }));

    return NextResponse.json({ success: true, repos: formatted });
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return NextResponse.json({ success: false, error: "Network error fetching GitHub repositories" }, { status: 500 });
  }
}
