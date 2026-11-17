"use client";

import { useState, useEffect, useSyncExternalStore, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import type { Project } from "@/content/profile";

const emptySubscribe = () => () => {};

interface ProjectManagerProps {
  isOpen: boolean;
  onClose: () => void;
  embedded?: boolean;
  initialProjects?: Project[];
}

interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  topics: string[];
}

const emptyProject: Project = {
  slug: "",
  title: "",
  tagline: "",
  year: new Date().getFullYear().toString(),
  category: "Full-Stack",
  role: "Lead Developer",
  problem: "",
  outcome: "",
  description: "",
  highlights: [],
  technologies: [],
  images: [{ src: "/projects/receipt-sorter-preview.webp", alt: "Project interface preview" }],
  githubUrl: "",
  liveUrl: "",
  featured: true,
  placeholder: false,
};

export function ProjectManager({ isOpen, onClose, embedded = false }: ProjectManagerProps) {
  const router = useRouter();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Authentication PIN state
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState("");

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Editor form state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Form input temporary fields
  const [highlightsInput, setHighlightsInput] = useState("");
  const [techInput, setTechInput] = useState("");

  // GitHub repos
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [fetchingRepos, setFetchingRepos] = useState(false);
  const [showRepoPicker, setShowRepoPicker] = useState(false);

  // Image handling state & functions
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProject) return;

    const file = files[0];
    setUploadingImage(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", editingProject.slug || "screenshot");
    formData.append("pin", pin);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "x-admin-pin": pin,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        const newImage = {
          src: data.url,
          alt: `${editingProject.title} application screenshot`,
        };

        // Put the newly uploaded photo as the Primary Cover (index 0)
        const updatedImages = [newImage, ...(editingProject.images || []).filter((img) => img.src !== data.url)];
        const updatedProject = {
          ...editingProject,
          images: updatedImages,
          placeholder: false,
        };

        setEditingProject(updatedProject);

        // Auto-save the project so user does not need to manually click save
        if (!isNew && updatedProject.slug) {
          try {
            const saveRes = await fetch("/api/admin/projects", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "x-admin-pin": pin,
              },
              body: JSON.stringify(updatedProject),
            });
            const saveData = await saveRes.json();
            if (saveData.success) {
              setProjects(saveData.projects);
              window.dispatchEvent(new CustomEvent("projects-updated", { detail: saveData.projects }));
              setStatusMessage({
                type: "success",
                text: `Screenshot uploaded & set as primary cover! Live on site and committed to GitHub.`,
              });
              router.refresh();
              return;
            }
          } catch (saveErr) {
            console.error("Auto-save after upload failed:", saveErr);
          }
        }

        setStatusMessage({
          type: "success",
          text: data.committed
            ? `Screenshot "${file.name}" uploaded and set as cover! Click "Save Project" below to finish.`
            : `Screenshot "${file.name}" uploaded! Click "Save Project" below to finish.`,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Failed to upload image.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Network error occurred while uploading image.",
      });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const addImageFromUrl = () => {
    if (!newImageUrl.trim() || !editingProject) return;
    const url = newImageUrl.trim();
    const newImage = {
      src: url,
      alt: `${editingProject.title} screenshot`,
    };
    setEditingProject((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        images: [...(prev.images || []), newImage],
        placeholder: false,
      };
    });
    setNewImageUrl("");
  };

  const removeImage = (index: number) => {
    setEditingProject((prev) => {
      if (!prev) return null;
      const filtered = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: filtered };
    });
  };

  const setPrimaryImage = (index: number) => {
    setEditingProject((prev) => {
      if (!prev) return null;
      const images = [...prev.images];
      const [selected] = images.splice(index, 1);
      images.unshift(selected);
      return { ...prev, images };
    });
  };

  const updateImageAlt = (index: number, alt: string) => {
    setEditingProject((prev) => {
      if (!prev) return null;
      const images = [...prev.images];
      images[index] = { ...images[index], alt };
      return { ...prev, images };
    });
  };

  // Fetch projects when opened and unlocked
  useEffect(() => {
    if (!isOpen || !isUnlocked) return;
    let ignore = false;

    async function load() {
      try {
        const res = await fetch("/api/admin/projects");
        const data = await res.json();
        if (!ignore && data.success) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error(err);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [isOpen, isUnlocked]);

  const refreshProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setPinError("Please enter your PIN");
      return;
    }
    // Test PIN against API
    fetch("/api/admin/projects", {
      headers: { "x-admin-pin": pin.trim() },
    })
      .then((res) => {
        if (res.status === 401) {
          setPinError("Incorrect PIN. (Default: somya)");
        } else {
          localStorage.setItem("portfolio_admin_pin", pin.trim());
          setIsUnlocked(true);
          setPinError("");
          refreshProjects();
        }
      })
      .catch(() => setPinError("Network error. Try again."));
  };

  const handleLock = () => {
    localStorage.removeItem("portfolio_admin_pin");
    setIsUnlocked(false);
    setPin("");
  };

  const startEdit = (project: Project) => {
    setEditingProject({ ...project });
    setIsNew(false);
    setHighlightsInput(project.highlights?.join("\n") || "");
    setTechInput(project.technologies?.join(", ") || "");
    setStatusMessage(null);
  };

  const startNew = () => {
    setEditingProject({ ...emptyProject });
    setIsNew(true);
    setHighlightsInput("");
    setTechInput("");
    setStatusMessage(null);
  };

  const fetchGitHubRepos = async () => {
    setFetchingRepos(true);
    try {
      const res = await fetch("/api/admin/github-sync");
      const data = await res.json();
      if (data.success) {
        setGithubRepos(data.repos);
        setShowRepoPicker(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingRepos(false);
    }
  };

  const importRepo = (repo: GitHubRepo) => {
    const slug = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const tech = [repo.language, ...repo.topics].filter(Boolean);
    const category =
      repo.language === "Python"
        ? "Machine Learning"
        : repo.language === "GDScript"
        ? "Web Systems"
        : "Full-Stack";

    setEditingProject({
      slug,
      title: repo.name.replace(/[-_]/g, " "),
      tagline: repo.description || "Open-source software project built by Somya Moonat.",
      year: new Date().getFullYear().toString(),
      category,
      role: "Lead Developer",
      problem: `Engineered ${repo.name} to solve key technical challenges in ${category.toLowerCase()}.`,
      outcome: `Published on GitHub with clean modular code, automated pipelines, and full documentation.`,
      description: repo.description || `A dedicated ${category.toLowerCase()} application and software architecture.`,
      highlights: [
        `Developed using ${repo.language} with defensive software practices and robust test suites`,
        `Maintained public repository with clean commits and documentation`,
      ],
      technologies: tech.length > 0 ? tech : ["TypeScript", "JavaScript"],
      images: [{ src: "/projects/receipt-sorter-preview.webp", alt: `${repo.name} interface preview` }],
      githubUrl: repo.url,
      liveUrl: repo.homepage || undefined,
      featured: true,
      placeholder: false,
    });
    setHighlightsInput(
      `Developed using ${repo.language} with defensive software practices and robust test suites\nMaintained public repository with clean commits and documentation`
    );
    setTechInput(tech.join(", "));
    setIsNew(true);
    setShowRepoPicker(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title || !editingProject.slug) {
      setStatusMessage({ type: "error", text: "Title and slug are required." });
      return;
    }

    setSaving(true);
    setStatusMessage(null);

    const projectToSave: Project = {
      ...editingProject,
      slug: editingProject.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
      highlights: highlightsInput
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
      technologies: techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      githubUrl: editingProject.githubUrl?.trim() || undefined,
      liveUrl: editingProject.liveUrl?.trim() || undefined,
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: isNew ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
        },
        body: JSON.stringify(projectToSave),
      });

      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
        try {
          localStorage.setItem("somya_portfolio_projects", JSON.stringify(data.projects));
          window.dispatchEvent(new CustomEvent("projects-updated", { detail: data.projects }));
        } catch {}
        setEditingProject(null);
        setIsNew(false);
        const commitMsg = data.committed
          ? `Project "${projectToSave.title}" saved and committed to GitHub! Vercel is redeploying.`
          : `Project "${projectToSave.title}" saved successfully!`;
        setStatusMessage({ type: "success", text: commitMsg });
        router.refresh();
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to save project." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Are you sure you want to remove "${title}" from the website?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
        headers: { "x-admin-pin": pin },
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
        try {
          localStorage.setItem("somya_portfolio_projects", JSON.stringify(data.projects));
          window.dispatchEvent(new CustomEvent("projects-updated", { detail: data.projects }));
        } catch {}
        const commitMsg = data.committed
          ? `Project "${title}" removed and committed to GitHub! Vercel is redeploying.`
          : `Project "${title}" was removed.`;
        setStatusMessage({ type: "success", text: commitMsg });
        router.refresh();
      } else {
        alert(data.error || "Failed to delete project.");
      }
    } catch {
      alert("Network error deleting project.");
    }
  };

  const managerContent = (
    <>
      {/* Header */}
      <div className="p-6 border-b border-border-hairline flex items-center justify-between bg-surface/50">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-text-primary font-semibold">
                  Project Dossier Manager
                </h2>
                <p className="font-mono text-[11px] text-text-muted mt-0.5">
                  Direct In-App Project Editing &amp; GitHub Sync
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              {isUnlocked && (
                <button
                  type="button"
                  onClick={handleLock}
                  className="text-text-muted hover:text-text-primary uppercase tracking-wider text-[11px] px-2 py-1 border border-border-hairline hover:border-border-strong rounded-xs transition-colors"
                >
                  [Lock]
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-text-muted hover:text-accent font-mono text-lg px-2 py-1 transition-colors"
                aria-label="Close manager"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Feedback notification */}
            {statusMessage && (
              <div
                className={`p-3.5 border font-mono text-xs rounded-xs flex items-center justify-between ${
                  statusMessage.type === "success"
                    ? "bg-accent/10 border-accent text-accent"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                <span>{statusMessage.text}</span>
                <button
                  type="button"
                  onClick={() => setStatusMessage(null)}
                  className="text-text-muted hover:text-text-primary ml-2"
                >
                  ✕
                </button>
              </div>
            )}

            {/* View 1: PIN Locked Screen */}
            {!isUnlocked ? (
              <div className="max-w-md mx-auto py-16 text-center space-y-6">
                <div className="w-12 h-12 mx-auto rounded-full border border-border-hairline bg-surface-subtle flex items-center justify-center font-mono text-accent text-lg">
                  ⚿
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-text-primary">Unlock Editor</h3>
                  <p className="text-sm text-text-secondary mt-1 max-w-xs mx-auto">
                    Enter your administrative PIN to add, update, or remove projects directly on the website.
                  </p>
                </div>

                <form onSubmit={handleUnlock} className="space-y-4 max-w-xs mx-auto text-left">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-text-muted mb-1.5">
                      Admin Passkey (Default: somya)
                    </label>
                    <input
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="Enter PIN"
                      autoFocus
                      className="w-full bg-surface-subtle border border-border-hairline px-3.5 py-2 font-mono text-sm text-text-primary rounded-xs focus:outline-none focus:border-accent"
                    />
                    {pinError && <p className="font-mono text-xs text-accent mt-1">{pinError}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-text-primary text-canvas hover:bg-accent hover:text-white py-2.5 font-mono text-xs uppercase tracking-wider transition-colors rounded-xs font-semibold cursor-pointer"
                  >
                    Unlock &amp; Edit
                  </button>
                </form>
              </div>
            ) : editingProject ? (
              /* View 2: Project Form (Add / Edit) */
              <form onSubmit={handleSave} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-border-hairline font-mono text-xs">
                  <span className="text-accent font-semibold uppercase tracking-wider">
                    {isNew ? "Create New Project" : `Editing: ${editingProject.title}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="text-text-muted hover:text-text-primary underline text-[11px]"
                  >
                    ← Back to list
                  </button>
                </div>

                {/* Title & Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setEditingProject((prev) =>
                          prev
                            ? {
                                ...prev,
                                title,
                                slug: isNew ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : prev.slug,
                              }
                            : null
                        );
                      }}
                      className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.slug}
                      onChange={(e) =>
                        setEditingProject((prev) => (prev ? { ...prev, slug: e.target.value } : null))
                      }
                      className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm font-mono rounded-xs focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Category & Year & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                      Category *
                    </label>
                    <select
                      value={editingProject.category}
                      onChange={(e) =>
                        setEditingProject((prev) => (prev ? { ...prev, category: e.target.value } : null))
                      }
                      className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-accent font-sans"
                    >
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Computer Vision">Computer Vision</option>
                      <option value="Full-Stack">Full-Stack</option>
                      <option value="Web Systems">Web Systems</option>
                      <option value="Open Source">Open Source</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                      Year *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.year}
                      onChange={(e) =>
                        setEditingProject((prev) => (prev ? { ...prev, year: e.target.value } : null))
                      }
                      className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm font-mono rounded-xs focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                      Role *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.role}
                      onChange={(e) =>
                        setEditingProject((prev) => (prev ? { ...prev, role: e.target.value } : null))
                      }
                      className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Tagline */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                    Tagline (Brief headline summary) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.tagline}
                    onChange={(e) =>
                      setEditingProject((prev) => (prev ? { ...prev, tagline: e.target.value } : null))
                    }
                    className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Problem Statement */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                    Problem &amp; Technical Constraints *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingProject.problem}
                    onChange={(e) =>
                      setEditingProject((prev) => (prev ? { ...prev, problem: e.target.value } : null))
                    }
                    className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-accent resize-y font-sans"
                  />
                </div>

                {/* Delivered Outcome */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                    Outcome &amp; Results Delivered *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingProject.outcome}
                    onChange={(e) =>
                      setEditingProject((prev) => (prev ? { ...prev, outcome: e.target.value } : null))
                    }
                    className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-accent resize-y font-sans"
                  />
                </div>

                {/* Architecture & Full Description */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                    Architecture &amp; Implementation Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject((prev) => (prev ? { ...prev, description: e.target.value } : null))
                    }
                    className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-accent resize-y font-sans"
                  />
                </div>

                {/* Highlights (One per line) */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                    Key Highlights (One bullet per line)
                  </label>
                  <textarea
                    rows={3}
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    placeholder="Built offline vision pipeline with zero cloud dependencies&#10;Integrated SQLite ledger with tax summaries&#10;Optimized inference latency to sub-20ms"
                    className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-accent resize-y font-mono text-xs"
                  />
                </div>

                {/* Technologies (Comma separated) */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                    Technologies / Stack (Comma separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Python, Computer Vision, SQLite, WebAssembly"
                    className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm font-mono rounded-xs focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Links & Preview image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.githubUrl || ""}
                      onChange={(e) =>
                        setEditingProject((prev) => (prev ? { ...prev, githubUrl: e.target.value } : null))
                      }
                      placeholder="https://github.com/somyamoonat/repo"
                      className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm font-mono rounded-xs focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                      Live URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={editingProject.liveUrl || ""}
                      onChange={(e) =>
                        setEditingProject((prev) => (prev ? { ...prev, liveUrl: e.target.value } : null))
                      }
                      placeholder="https://demo.example.com"
                      className="w-full bg-surface-subtle border border-border-hairline px-3 py-2 text-sm font-mono rounded-xs focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Project Imagery & Real App Screenshots */}
                <div className="space-y-4 pt-2 border-t border-border-hairline">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-text-primary font-semibold">
                        App Screenshots &amp; Media ({editingProject.images?.length || 0})
                      </label>
                      <p className="text-[11px] text-text-muted">
                        Upload real screenshots of your application from your device, or link external graphics.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        disabled={uploadingImage}
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-accent text-white px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-xs hover:bg-accent/90 transition-colors inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {uploadingImage ? (
                          <>
                            <span className="w-2.5 h-2.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            <span>Uploading to GitHub...</span>
                          </>
                        ) : (
                          <>
                            <span>↑</span>
                            <span>Upload from Device</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Existing Images Grid */}
                  {editingProject.images && editingProject.images.length > 0 ? (
                    <div className="space-y-3">
                      {editingProject.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-surface-subtle/80 border border-border-hairline rounded-xs"
                        >
                          {/* Thumbnail preview */}
                          <div className="relative w-28 h-20 bg-surface border border-border-hairline rounded-xs overflow-hidden shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.src}
                              alt={img.alt || "Preview"}
                              className="w-full h-full object-cover"
                            />
                            {idx === 0 && (
                              <span className="absolute bottom-0 inset-x-0 bg-accent/90 text-white font-mono text-[9px] uppercase tracking-wider text-center py-0.5">
                                Primary Cover
                              </span>
                            )}
                          </div>

                          {/* Info & Alt Text Editor */}
                          <div className="flex-1 min-w-0 space-y-1.5 w-full">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[10px] text-text-muted truncate">
                                {img.src}
                              </span>
                              <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px]">
                                {idx !== 0 && (
                                  <button
                                    type="button"
                                    onClick={() => setPrimaryImage(idx)}
                                    className="px-2 py-0.5 border border-border-hairline hover:border-accent hover:text-accent rounded-xs transition-colors"
                                  >
                                    Set as Cover
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => removeImage(idx)}
                                  className="px-2 py-0.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xs transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>

                            <input
                              type="text"
                              value={img.alt}
                              placeholder="Image caption / alt text (e.g. Dashboard view)"
                              onChange={(e) => updateImageAlt(idx, e.target.value)}
                              className="w-full bg-surface border border-border-hairline px-2.5 py-1 text-xs rounded-xs font-sans focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 border border-dashed border-border-hairline text-center text-text-muted font-mono text-xs rounded-xs">
                      No images added yet. Click &quot;Upload from Device&quot; to add a screenshot of your app.
                    </div>
                  )}

                  {/* Add Image via URL or Preset */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2 font-mono text-xs">
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="Or paste image URL (e.g. https://... or /projects/...)"
                      className="flex-1 bg-surface-subtle border border-border-hairline px-3 py-1.5 text-xs rounded-xs focus:outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={addImageFromUrl}
                      disabled={!newImageUrl.trim()}
                      className="px-3 py-1.5 border border-border-hairline hover:border-accent hover:text-accent disabled:opacity-40 rounded-xs transition-colors cursor-pointer"
                    >
                      + Add Image URL
                    </button>
                  </div>

                  {/* Quick Preset Wireframes */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px] text-text-muted">
                    <span>Default wireframes:</span>
                    {[
                      { label: "Receipt Sorter", path: "/projects/receipt-sorter-preview.webp" },
                      { label: "Sign-to-Voice", path: "/projects/sign-to-voice-preview.webp" },
                      { label: "Crochet Diaryy", path: "/projects/crochet-diaryy-preview.webp" },
                      { label: "Moon Sweepers", path: "/projects/moon-sweepers-preview.webp" },
                    ].map((preset) => (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() => {
                          setEditingProject((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  images: [...(prev.images || []), { src: preset.path, alt: `${preset.label} preview` }],
                                }
                              : null
                          );
                        }}
                        className="underline hover:text-accent cursor-pointer"
                      >
                        +{preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured toggle */}
                <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                  <input
                    type="checkbox"
                    id="feat_toggle"
                    checked={editingProject.featured}
                    onChange={(e) =>
                      setEditingProject((prev) => (prev ? { ...prev, featured: e.target.checked } : null))
                    }
                    className="accent-accent"
                  />
                  <label htmlFor="feat_toggle" className="text-text-primary">
                    Featured Project (Shown in primary showcase)
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-border-hairline font-mono text-xs">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-accent text-white px-5 py-2.5 rounded-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                  >
                    {saving ? "Saving..." : isNew ? "Add to Portfolio" : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="border border-border-hairline text-text-muted hover:text-text-primary px-4 py-2.5 rounded-xs uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* View 3: Project List with Actions */
              <div className="space-y-6">
                {/* Top action row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border-hairline font-mono text-xs">
                  <span className="text-text-muted uppercase tracking-wider">
                    {projects.length} Published Projects
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={fetchGitHubRepos}
                      disabled={fetchingRepos}
                      className="inline-flex items-center gap-1.5 border border-border-hairline bg-surface px-3 py-1.5 text-text-primary hover:border-accent hover:text-accent transition-colors rounded-xs cursor-pointer"
                    >
                      <span>{fetchingRepos ? "Syncing..." : "⚡ Import from GitHub"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={startNew}
                      className="bg-text-primary text-canvas px-3.5 py-1.5 text-xs uppercase tracking-wider hover:bg-accent hover:text-white transition-colors rounded-xs font-semibold cursor-pointer"
                    >
                      + Add Project
                    </button>
                  </div>
                </div>

                {/* GitHub Repo Import Modal / Picker */}
                {showRepoPicker && (
                  <div className="p-4 border border-border-hairline bg-surface-subtle/80 rounded-xs space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-semibold uppercase tracking-wider">
                        Select a GitHub Repository to Import:
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowRepoPicker(false)}
                        className="text-text-muted hover:text-text-primary text-sm"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="max-h-56 overflow-y-auto divide-y divide-border-hairline border border-border-hairline bg-surface">
                      {githubRepos.map((repo) => (
                        <div
                          key={repo.name}
                          className="p-3 flex items-center justify-between hover:bg-surface-subtle transition-colors gap-3"
                        >
                          <div>
                            <div className="font-semibold text-text-primary">{repo.name}</div>
                            <div className="text-[11px] text-text-muted truncate max-w-sm">
                              {repo.description || "No description provided"}
                            </div>
                            <span className="text-[10px] text-accent uppercase">{repo.language}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => importRepo(repo)}
                            className="bg-text-primary text-canvas px-3 py-1 rounded-xs text-[11px] hover:bg-accent hover:text-white transition-colors shrink-0 font-medium"
                          >
                            Import →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects List */}
                {projects.length === 0 ? (
                  <div className="py-12 text-center font-mono text-xs text-text-muted">
                    Loading projects from ledger...
                  </div>
                ) : (
                  <div className="space-y-3">
                    {projects.map((project, idx) => (
                      <div
                        key={project.slug}
                        className="p-4 border border-border-hairline bg-surface/50 hover:bg-surface transition-colors rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 max-w-md">
                          <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
                            <span className="text-accent font-semibold">0{idx + 1}.</span>
                            <span className="text-text-secondary uppercase">{project.category}</span>
                            <span>•</span>
                            <span>{project.year}</span>
                            {project.featured && (
                              <span className="px-1.5 py-0.2 text-[9px] bg-accent/15 text-accent border border-accent/30 rounded-xs uppercase">
                                Featured
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif text-lg text-text-primary">{project.title}</h4>
                          <p className="text-xs text-text-muted line-clamp-1">{project.tagline}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                          <button
                            type="button"
                            onClick={() => startEdit(project)}
                            className="px-3 py-1.5 border border-border-hairline hover:border-accent hover:text-accent transition-colors rounded-xs"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(project.slug, project.title)}
                            className="px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors rounded-xs"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
    </>
  );

  if (embedded) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-canvas border border-border-hairline shadow-lg flex flex-col text-text-primary rounded-xs corner-ticks overflow-hidden">
        {managerContent}
      </div>
    );
  }

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] overflow-hidden flex justify-end">
        {/* Full-screen Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        />

        {/* Slide-over Drawer with fixed width and full viewport height */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl bg-canvas border-l border-border-hairline shadow-2xl z-10 flex flex-col h-screen max-h-screen overflow-hidden text-text-primary"
        >
          {managerContent}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
