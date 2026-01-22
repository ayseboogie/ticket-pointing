import type * as prismic from "@prismicio/client";
import {
  CardGridSliceDefaultItem,
  Simplify,
} from "../../../../prismicio-types";
import CardGridCmp from "@/components/Slices/CardGridCmp";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type CardGridStoryProps = {
  sliceType: string;
  sliceVariation: string;
  heading: prismic.RichTextField;
  sliceItems: Array<Simplify<CardGridSliceDefaultItem>>;
};

const CardGridStory = ({
  sliceType,
  sliceVariation,
  heading,
  sliceItems,
}: CardGridStoryProps) => {
  return (
    <StoryBackgroundWrapper>
      <CardGridCmp
        sliceType={sliceType}
        sliceVariation={sliceVariation}
        heading={heading}
        sliceItems={sliceItems}
      />
    </StoryBackgroundWrapper>
  );
};

export default CardGridStory;
