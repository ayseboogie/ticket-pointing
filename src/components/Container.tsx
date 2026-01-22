import cn from "classnames";
import { ReactNode } from "react";

export function Container({
  className,
  ...props
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      id="container-component"
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
