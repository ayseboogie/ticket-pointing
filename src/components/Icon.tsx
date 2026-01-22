"use client";

import cn from "classnames";
import SVG from "react-inlinesvg";
import { ImageField } from "@prismicio/client";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

const iconStyles = {
  variants: {
    size: {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
      xl: "w-80 h-auto",
      xxl: "w-[200px] h-auto",
      auto: "w-auto",
    },
    color: {
      dark: "text-gray-darker",
      light: "text-light-gray",
      white: "text-white",
      blue: "text-vibrant-blue",
      lightBlue: "text-light-blue",
    },
  },
  defaultVariants: {
    size: "auto",
    color: "white",
  },
};

export type IconProps = {
  className?: string;
  src: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "auto";
  color?: "dark" | "light" | "white" | "blue" | "lightBlue";
  fallback?: ImageField;
};

/**
 * Icon
 * @param {string} className Additional class names
 * @param {string} src Path to SVG
 * @param {string} size Size of icon
 * @param {string} color Color of icon
 * @param {ImageField} fallback Fallback image
 * @returns {JSX.Element} Icon component
 * @example
 * <Icon src="/assets/svg/icon.svg" size="lg" color="purple" />
 */

export const Icon = ({
  className,
  src,
  size = "auto",
  color = "white",
  fallback,
}: IconProps) => {
  const processSVG = (code: string) => {
    // get values of width and height attributes
    const [, width, height] = code.match(
      /<svg.*?width="(.*?)" height="(.*?)"/,
    ) || ["", "", ""];

    // check if viewBox is present
    const viewBox = code.match(/viewBox="(.*?)"/);

    let transformedCode = code
      .replace(/fill=".*?"/g, 'fill="currentColor"')
      .replace(/style=".*?"/g, (style) =>
        style.includes("fill:") ? style.replace(/fill:.*?;/g, "") : style,
      );
    // if no viewBox is present, and we have width and height attributes, add viewBox
    if (!viewBox && width && height) {
      transformedCode = transformedCode.replace(
        /<svg/,
        `<svg viewBox="0 0 ${width} ${height}"`,
      );
    }

    return transformedCode;
  };

  return (
    <SVG
      className={cn(
        iconStyles.variants.size[size],
        iconStyles.variants.color[color],
        className,
      )}
      src={src}
      preProcessor={processSVG}
      onError={(error) => console.log("ICON ERROR", error.message)}
    >
      {fallback && (
        <div
          className={cn(
            iconStyles.variants.size[size],
            iconStyles.variants.color[color],
            className,
          )}
        >
          <SuspenseImage
            image={fallback}
            className={cn(
              "z-10 relative",
              iconStyles.variants.size[size],
              iconStyles.variants.color[color],
              className,
            )}
          />
        </div>
      )}
    </SVG>
  );
};
