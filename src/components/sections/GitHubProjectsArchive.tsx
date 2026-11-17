"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { GitHubRepoItem } from "@/app/api/github/repos/route";

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Pushed just now";
    if (diffHours < 24) return `Pushed ${diffHours}h ago`;
    if (diffDays === 1) return "Pushed yesterday";
    if (diffDays < 30) return `Pushed ${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateString;
  }
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  Python: "bg-emerald-400",
  GDScript: "bg-cyan-400",
  HTML: "bg-orange-400",
  CSS: "bg-purple-400",
  Rust: "bg-amber-600",
  Go: "bg-sky-400",
  C: "bg-gray-400",
  "C++": "bg-pink-400",
};

export function GitHubProjectsArchive() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [repos, setRepos] = useState<GitHubRepoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

  useEffect(() => {
    let ignore = false;

    async function fetchRepos() {
      setLoading(true);
      try {
        const res = await fetch("/api/github/repos");
        const data = await res.json();
        if (!ignore && data.success && Array.isArray(data.repos)) {
          setRepos(data.repos);
        }
      } catch (err) {
        console.warn("Could not fetch GitHub repositories:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchRepos();
    return () => {
      ignore = true;
    };
  }, []);

  const languages = ["All", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean)))];

  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.language.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLanguage === "All" || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  return (
    <div className="pt-10 border-t border-border-hairline mt-10">
      {/* Trigger Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-text-muted">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Real-Time GitHub Stream</span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Browse all public repositories directly from @somyamoonat, updated whenever a new commit is pushed.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="w-full sm:w-auto px-5 py-2.5 bg-surface border border-border-hairline hover:border-accent font-mono text-xs uppercase tracking-wider text-text-primary hover:text-accent rounded-xs transition-colors inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent"
          aria-expanded={isExpanded}
        >
          <svg className="w-4 h-4 fill-current text-accent shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span className="font-semibold">
            {isExpanded ? "Collapse Repositories ↑" : "More Projects (Live GitHub) ↓"}
          </span>
          {repos.length > 0 && (
            <span className="text-[10px] bg-surface-subtle border border-border-hairline px-2 py-0.5 rounded-xs font-mono text-text-muted">
              [{repos.length}]
            </span>
          )}
        </button>
      </div>

      {/* Expandable Repositories Archive */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="overflow-hidden pt-8 space-y-6"
          >
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-surface-subtle/50 border border-border-hairline rounded-xs">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repositories (e.g. Python, Godot, Web, ASL)..."
                className="flex-1 bg-surface border border-border-hairline px-3 py-1.5 text-xs font-mono rounded-xs focus:outline-none focus:border-accent text-text-primary"
              />

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 font-mono text-[11px]">
                <span className="text-text-muted uppercase tracking-wider text-[10px] mr-1 hidden md:inline">
                  Filter:
                </span>
                {languages.slice(0, 5).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-2.5 py-1 rounded-xs transition-colors shrink-0 ${
                      selectedLanguage === lang
                        ? "bg-text-primary text-canvas font-medium"
                        : "bg-surface text-text-muted hover:text-text-primary border border-border-hairline"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Repositories Grid */}
            {loading ? (
              <div className="py-12 text-center font-mono text-xs text-text-muted flex items-center justify-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                <span>Fetching live repositories from GitHub API...</span>
              </div>
            ) : filteredRepos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRepos.map((repo) => {
                  const langColor = languageColors[repo.language] || "bg-accent";

                  return (
                    <div
                      key={repo.name}
                      className="group p-5 bg-surface border border-border-hairline hover:border-border-strong rounded-xs glass-card transition-all flex flex-col justify-between gap-4"
                    >
                      {/* Top Row: Name + Language */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors font-medium inline-flex items-center gap-1.5"
                          >
                            <span>{repo.name}</span>
                            <span className="font-mono text-xs text-text-muted select-none">↗</span>
                          </a>

                          <div className="flex items-center gap-2 shrink-0 font-mono text-[10px] text-text-muted">
                            <span className={`w-2 h-2 rounded-full ${langColor}`} />
                            <span>{repo.language}</span>
                          </div>
                        </div>

                        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                          {repo.description}
                        </p>
                      </div>

                      {/* Bottom Row: Metadata & Direct Action Buttons */}
                      <div className="pt-3 border-t border-border-hairline flex items-center justify-between gap-3 font-mono text-[11px] text-text-muted">
                        <div className="flex items-center gap-3">
                          <span>{formatRelativeTime(repo.pushedAt)}</span>
                          {repo.stars > 0 && (
                            <span className="inline-flex items-center gap-1 text-text-secondary">
                              <span>★</span>
                              <span>{repo.stars}</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 bg-accent/10 border border-accent/40 text-accent hover:bg-accent hover:text-white rounded-xs transition-colors uppercase tracking-wider text-[10px]"
                            >
                              Live App ↗
                            </a>
                          )}

                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 bg-surface-subtle border border-border-hairline hover:border-accent hover:text-accent rounded-xs transition-colors uppercase tracking-wider text-[10px]"
                          >
                            GitHub ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 text-center font-mono text-xs text-text-muted border border-border-hairline rounded-xs">
                No repositories found matching &quot;{searchQuery}&quot;.
              </div>
            )}

            {/* Direct GitHub Profile Link */}
            <div className="pt-2 text-center font-mono text-xs">
              <a
                href="https://github.com/somyamoonat?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors inline-flex items-center gap-1.5"
              >
                <span>View all repositories on github.com/somyamoonat</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
