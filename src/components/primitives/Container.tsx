import React, { ElementType } from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
  size?: "content" | "prose" | "full";
}

export function Container({
  as: Component = "div",
  children,
  className = "",
  size = "content",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    content: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
    prose: "max-w-3xl mx-auto px-4 sm:px-6",
    full: "w-full px-4 sm:px-6 lg:px-8",
  };

  return (
    <Component
      className={`${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
