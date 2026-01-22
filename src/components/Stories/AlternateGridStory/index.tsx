import type * as prismic from "@prismicio/client";
import {
  AlternateGridSliceDefaultItem,
  AlternateGridSliceImageRightItem,
  Simplify,
} from "../../../../prismicio-types";
import AlternateGridCmp from "@/components/Slices/AlternateGridCmp";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type AlternateGridStoryProps = {
  sliceType: string;
  sliceVariation: string;
  eyebrowHeadline: prismic.KeyTextField;
  title: prismic.RichTextField;
  description: prismic.RichTextField;
  image: prismic.ImageField<never>;
  sliceItems:
    | Array<Simplify<AlternateGridSliceDefaultItem>>
    | Array<Simplify<AlternateGridSliceImageRightItem>>;
};

const AlternateGridStory = ({
  sliceType,
  sliceVariation,
  eyebrowHeadline,
  title,
  description,
  image,
  sliceItems,
}: AlternateGridStoryProps) => {
  return (
    <StoryBackgroundWrapper>
      <AlternateGridCmp
        sliceType={sliceType}
        sliceVariation={sliceVariation}
        eyebrowHeadline={eyebrowHeadline}
        title={title}
        description={description}
        image={image}
        sliceItems={sliceItems}
      />
    </StoryBackgroundWrapper>
  );
};

export default AlternateGridStory;
