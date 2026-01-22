import cn from "classnames";
import { ReactNode } from "react";
import BackgroundImage from "@/components/ComponentTheme/BackgroundImage";

type Theme = "Blue" | "Dark" | "Light" | "White" | "Green";

type StoryBackgroundWrapperProps = {
  children: ReactNode;
  theme?: Theme;
  /**
   * Optional slice object with primary.theme property to extract theme from
   */
  slice?: {
    primary?: {
      theme?: Theme | string | null;
    };
  };
  className?: string;
};

/**
 * Universal background wrapper component for Storybook stories.
 * Extracts theme from slice data or accepts a direct theme prop.
 * Provides consistent background styling across all story components.
 */
const StoryBackgroundWrapper = ({
  children,
  theme,
  slice,
  className,
}: StoryBackgroundWrapperProps) => {
  // Determine theme: direct prop > slice primary theme > default "White"
  const resolvedTheme: Theme =
    theme || (slice?.primary?.theme as Theme) || "White";

  const themeBackgroundColor =
    resolvedTheme === "Green"
      ? "green"
      : resolvedTheme === "Blue" || resolvedTheme === "Dark"
        ? "dark"
        : "light";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden min-h-[400px] w-full",
        themeBackgroundColor === "green"
          ? "bg-accent"
          : themeBackgroundColor === "dark"
            ? "bg-darkGrey"
            : "bg-white",
        className,
      )}
    >
      {(resolvedTheme === "Blue" || resolvedTheme === "Light") && (
        <BackgroundImage theme={resolvedTheme} />
      )}
      {children}
    </div>
  );
};

export default StoryBackgroundWrapper;
