import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ImageLeft from "@/components/Slices/ImageBesideText/ImageLeft.tsx";
import ImageRight from "@/components/Slices/ImageBesideText/ImageRight.tsx";

/**
 * Props for `ImageBesideText`.
 */
export type ImageBesideTextProps =
  SliceComponentProps<Content.ImageBesideTextSlice>;

/**
 * Component for "ImageBesideText" Slices.
 */
const ImageBesideText: FC<ImageBesideTextProps> = ({ slice }) => {
  switch (slice.variation) {
    case "imageLeft":
      return <ImageLeft slice={slice} />;
    case "imageRight":
      return <ImageRight slice={slice} />;
  }
};

export default ImageBesideText;
