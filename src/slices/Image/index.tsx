import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ImageCmp from "@/components/Slices/ImageCmp";

export type ImageProps = SliceComponentProps<Content.ImageSlice>;

const Image = ({ slice }: ImageProps) => {
  return (
    <ImageCmp
      sliceType={slice.slice_type}
      sliceVariation={slice.variation}
      image={slice.primary.image}
      caption={slice.primary.caption}
    />
  );
};

export default Image;
