import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import TextCmp from "@/components/Slices/Text/TextCmp.tsx";
import TextSection from "@/components/Slices/Text/TextSection.tsx";

/**
 * Props for `Text`.
 */
export type TextProps = SliceComponentProps<Content.TextSlice>;

/**
 * Component for "Text" Slices.
 */
const Text = ({ slice }: TextProps) => {
  switch (slice.variation) {
    case "textSection":
      return <TextSection slice={slice} />;
    case "default":
      return <TextCmp slice={slice} />;
    case "center":
      return <TextCmp slice={slice} />;
  }
};

export default Text;
