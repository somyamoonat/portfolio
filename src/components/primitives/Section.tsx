import React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
  bordered?: boolean;
  spacing?: "sm" | "md" | "lg";
  className?: string;
}

export function Section({
  id,
  children,
  bordered = true,
  spacing = "md",
  className = "",
  ...props
}: SectionProps) {
  const spacingClasses = {
    sm: "py-12 sm:py-16",
    md: "py-20 sm:py-28",
    lg: "py-28 sm:py-36",
  };

  return (
    <section
      id={id}
      className={`relative w-full ${spacingClasses[spacing]} ${
        bordered ? "hairline-b" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
