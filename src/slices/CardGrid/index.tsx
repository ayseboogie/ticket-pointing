import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import CardGridCmp from "@/components/Slices/CardGridCmp";

export type CardGridProps = SliceComponentProps<Content.CardGridSlice>;

const CardGrid = ({ slice }: CardGridProps) => {
  return (
    <CardGridCmp
      sliceType={slice.slice_type}
      sliceVariation={slice.variation}
      heading={slice.primary.heading}
      sliceItems={slice.items}
    />
  );
};

export default CardGrid;
