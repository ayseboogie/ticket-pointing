import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import FeaturesHorizontal from "@/components/Slices/Features/FeaturesHorizontal.tsx";
import FeaturesVertical from "@/components/Slices/Features/FeaturesVertical.tsx";

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps) => {
  switch (slice.variation) {
    case "leftSide":
      return <FeaturesHorizontal slice={slice} rightSide={false} />;
    case "rightSide":
      return <FeaturesHorizontal slice={slice} rightSide={true} />;
    case "above":
      return <FeaturesVertical slice={slice} above={true} />;
    case "below":
      return <FeaturesVertical slice={slice} above={false} />;
  }
};

export default Features;
