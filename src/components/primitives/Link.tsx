import NextLink from "next/link";
import React from "react";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  variant?: "editorial" | "mono" | "plain";
  external?: boolean;
  showArrow?: boolean;
  className?: string;
}

export function Link({
  href,
  children,
  variant = "editorial",
  external,
  showArrow,
  className = "",
  ...props
}: LinkProps) {
  const isExternal =
    external ??
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:"));

  const shouldShowArrow = showArrow ?? isExternal;

  const variantClasses = {
    editorial:
      "inline-flex items-baseline gap-1 text-text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-border-strong hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    mono: "inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    plain: "text-text-primary hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  };

  const content = (
    <>
      <span>{children}</span>
      {shouldShowArrow && (
        <span
          aria-hidden="true"
          className="text-text-muted group-hover:text-accent select-none font-mono text-[0.85em] transition-transform duration-150 inline-block"
        >
          ↗
        </span>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={`group ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {content}
    </NextLink>
  );
}
