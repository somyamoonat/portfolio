import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-[11px]",
    md: "px-5 py-2.5 text-xs",
    lg: "px-6 py-3.5 text-sm",
  };

  const variantClasses = {
    primary:
      "bg-text-primary text-canvas font-semibold hover:bg-accent hover:text-white active:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    secondary:
      "hairline-all bg-surface text-text-primary hover:border-accent hover:text-accent active:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    ghost:
      "text-text-secondary hover:text-accent hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider select-none transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    const isExternal =
      target === "_blank" ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:");

    return (
      <a
        href={href}
        target={target || (isExternal ? "_blank" : undefined)}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
        className={combinedClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}
