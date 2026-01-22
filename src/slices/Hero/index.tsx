import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import HeroTheme from "@/components/Slices/Hero/HeroTheme.tsx";
import HeroImage from "@/components/Slices/Hero/HeroImage.tsx";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps) => {
  switch (slice.variation) {
    case "default":
      return <HeroTheme slice={slice} />;
    case "titleOnly":
      return <HeroTheme slice={slice} />;
    case "imageDefault":
      return <HeroImage slice={slice} />;
    case "imageTitleOnly":
      return <HeroImage slice={slice} />;
  }
};

export default Hero;
