import { type Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import AlternateGridCmp from "@/components/Slices/AlternateGridCmp";

export type AlternateGridProps =
  SliceComponentProps<Content.AlternateGridSlice>;

const AlternateGrid = ({ slice }: AlternateGridProps) => {
  return (
    <AlternateGridCmp
      sliceType={slice.slice_type}
      sliceVariation={slice.variation}
      eyebrowHeadline={slice.primary.eyebrowHeadline}
      title={slice.primary.title}
      description={slice.primary.description}
      image={slice.primary.image}
      sliceItems={slice.items}
    />
  );
};

export default AlternateGrid;
