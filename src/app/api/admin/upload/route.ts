import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ADMIN_PIN = process.env.ADMIN_PIN || "somya";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "somyamoonat";
const GITHUB_REPO = process.env.GITHUB_REPO || "portfolio";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

function verifyAuth(request: Request, pinFromForm?: string | null): boolean {
  const pinHeader = request.headers.get("x-admin-pin");
  return pinHeader === ADMIN_PIN || pinFromForm === ADMIN_PIN;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pin = formData.get("pin") as string | null;

    if (!verifyAuth(request, pin)) {
      return NextResponse.json({ success: false, error: "Unauthorized: Invalid PIN" }, { status: 401 });
    }

    const file = formData.get("file") as File | null;
    const slug = (formData.get("slug") as string | null) || "screenshot";

    if (!file) {
      return NextResponse.json({ success: false, error: "No image file provided" }, { status: 400 });
    }

    // Size limit: 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "Image file exceeds 10MB limit. Please compress or resize." },
        { status: 400 }
      );
    }

    // Determine extension
    let ext = "png";
    const mimeType = file.type;
    if (mimeType === "image/jpeg" || mimeType === "image/jpg") ext = "jpg";
    else if (mimeType === "image/webp") ext = "webp";
    else if (mimeType === "image/svg+xml") ext = "svg";
    else if (mimeType === "image/gif") ext = "gif";
    else {
      const nameExt = file.name.split(".").pop()?.toLowerCase();
      if (nameExt && ["png", "jpg", "jpeg", "webp", "svg", "gif"].includes(nameExt)) {
        ext = nameExt === "jpeg" ? "jpg" : nameExt;
      }
    }

    const cleanSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 32) || "preview";

    const filename = `${cleanSlug}-${Date.now()}.${ext}`;
    const publicUrl = `/projects/${filename}`;
    const localDir = path.join(process.cwd(), "public", "projects");
    const localFilePath = path.join(localDir, filename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Write locally (for local dev environments)
    try {
      await fs.mkdir(localDir, { recursive: true });
      await fs.writeFile(localFilePath, buffer);
    } catch (fsErr) {
      console.warn("Local filesystem write skipped (serverless environment):", fsErr);
    }

    // 2. Commit directly to GitHub repository (for production persistence)
    let committedToGitHub = false;
    if (GITHUB_TOKEN) {
      try {
        const base64Content = buffer.toString("base64");
        const ghRes = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/public/projects/${filename}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
              "User-Agent": "Portfolio-Admin-Sync",
            },
            body: JSON.stringify({
              message: `chore(media): upload project screenshot ${filename} [via admin]`,
              content: base64Content,
              branch: GITHUB_BRANCH,
            }),
          }
        );

        if (ghRes.ok) {
          committedToGitHub = true;
        } else {
          console.warn("GitHub media upload returned:", ghRes.status, await ghRes.text());
        }
      } catch (ghErr) {
        console.error("Error committing image to GitHub:", ghErr);
      }
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      committed: committedToGitHub,
    });
  } catch (error) {
    console.error("Error handling image upload:", error);
    return NextResponse.json({ success: false, error: "Failed to process image upload" }, { status: 500 });
  }
}
