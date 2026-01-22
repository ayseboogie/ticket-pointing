import cn from "classnames";
import BackgroundImage from "./BackgroundImage.tsx";
import { ReactNode } from "react";

export const ThemeContainer = ({
  children,
  theme,
  className,
}: {
  children: ReactNode;
  theme: "Blue" | "Dark" | "Light" | "White" | "Green";
  className?: string;
}) => {
  const themeBackgroundColor =
    theme === "Green"
      ? "green"
      : theme === "Blue" || theme === "Dark"
        ? "dark"
        : "light";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        themeBackgroundColor === "green"
          ? "bg-accent"
          : themeBackgroundColor === "dark"
            ? "bg-darkGrey"
            : "bg-white",
        className,
      )}
    >
      {(theme === "Blue" || theme === "Light") && (
        <BackgroundImage theme={theme} />
      )}
      {children}
    </div>
  );
};
