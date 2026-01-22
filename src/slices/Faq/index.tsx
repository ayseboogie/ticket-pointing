import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import FaqThreeColumns from "@/components/Slices/Faq/FaqThreeColumns.tsx";
import FaqCentered from "@/components/Slices/Faq/FaqCentered.tsx";

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq = ({ slice }: FaqProps) => {
  switch (slice.variation) {
    case "twoColumns":
      return <FaqThreeColumns slice={slice} threeCols={false} />;
    case "threeColumns":
      return <FaqThreeColumns slice={slice} threeCols={true} />;
    case "centered":
      return <FaqCentered slice={slice} />;
  }
};

export default Faq;
