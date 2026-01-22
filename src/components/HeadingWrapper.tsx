import React from "react";
import cn from "classnames";

export type HeadingProps = {
  size?: string;
  children: React.ReactNode;
  className?: string;
};
export const HeadingWrapper = ({
  size = "4xl",
  children,
  className,
}: HeadingProps) => {
  return (
    <h1
      className={cn(
        "font-sans font-normal tracking-normal",
        size === "9xl" && "text-5xl md:text-9xl",
        size === "7xl" && "text-4xl md:text-7xl",
        size === "6xl" && "text-5xl md:text-6xl",
        size === "5xl" && "text-4xl md:text-5xl",
        size === "4xl" && "text-3xl md:text-4xl",
        size === "3xl" && "text-3xl",
        size === "2xl" && "text-2xl",
        size === "xl" && "text-xl",
        size === "lg" && "text-lg",
        size === "base" && "text-base",
        className,
      )}
    >
      {children}
    </h1>
  );
};
