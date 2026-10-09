"use client";

interface DevPlaceholderBadgeProps {
  placeholder?: boolean;
  className?: string;
}

export function DevPlaceholderBadge({
  placeholder,
  className = "",
}: DevPlaceholderBadgeProps) {
  // Only render if marked placeholder and strictly in development mode
  if (!placeholder || process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <span
      title="This item contains placeholder data for development. Replace in src/content/profile.ts"
      className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.5 border border-amber-500/25 select-none ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      Dev: Placeholder
    </span>
  );
}
