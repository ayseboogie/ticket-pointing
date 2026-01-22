import React from "react";
import cn from "classnames";

export type BoundedProps = {
  id?: string;
  size?: "small" | "base" | "wide" | "widest";
  className?: string;
  children: React.ReactNode;
};

const Bounded = ({ id, size = "base", className, children }: BoundedProps) => {
  return (
    <div
      id={id}
      className={cn("px-4 py-8 md:py-10 md:px-6 lg:py-12", className)}
    >
      <div
        className={cn(
          "mx-auto w-full",
          size === "small" && "max-w-xl",
          size === "base" && "max-w-3xl",
          size === "wide" && "max-w-4xl",
          size === "widest" && "max-w-6xl",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Bounded;
