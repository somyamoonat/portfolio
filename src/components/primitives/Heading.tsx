import React, { ElementType } from "react";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType;
  size?: "display" | "xl" | "lg" | "md" | "sm";
  font?: "serif" | "sans" | "mono";
  children: React.ReactNode;
  className?: string;
}

export function Heading({
  as: Component = "h2",
  size = "xl",
  font,
  children,
  className = "",
  ...props
}: HeadingProps) {
  // If font is explicitly set, use it; otherwise deduce sensible font from size
  const resolvedFont =
    font ||
    (size === "display" || size === "xl" || size === "lg" || size === "md"
      ? "serif"
      : "mono");

  const fontClasses = {
    serif: "font-serif",
    sans: "font-sans",
    mono: "font-mono",
  };

  const sizeClasses = {
    display:
      "text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95] font-normal text-text-primary",
    xl: "text-3xl sm:text-4xl md:text-5xl tracking-tight font-normal text-text-primary",
    lg: "text-2xl sm:text-3xl tracking-tight font-normal text-text-primary",
    md: "text-xl sm:text-2xl text-text-primary",
    sm: "text-xs uppercase tracking-widest text-text-muted font-normal",
  };

  return (
    <Component
      className={`${fontClasses[resolvedFont]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
