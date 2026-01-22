import { Content } from "@prismicio/client";
import Features from "@/slices/Features";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type FeaturesStoryProps = {
  slice: Content.FeaturesSlice;
};

const FeaturesStory = ({ slice }: FeaturesStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <Features slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default FeaturesStory;
