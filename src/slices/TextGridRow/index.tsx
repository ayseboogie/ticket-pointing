import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import TextGridRowCmp from "@/components/Slices/TextGridRow/TextGridRowCmp.tsx";
import TextGridRowLink from "@/components/Slices/TextGridRow/TextGridRowLink.tsx";

/**
 * Props for `TextGridRow`.
 */
export type TextGridRowProps = SliceComponentProps<Content.TextGridRowSlice>;

/**
 * Component for "TextGridRow" Slices.
 */
const TextGridRow = ({ slice }: TextGridRowProps) => {
  switch (slice.variation) {
    case "default":
      return <TextGridRowCmp slice={slice} />;
    case "centered":
      return <TextGridRowCmp slice={slice} />;
    case "centeredLinks":
      return <TextGridRowLink slice={slice} />;
  }
};

export default TextGridRow;
