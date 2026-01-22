import { Content } from "@prismicio/client";
import Pricing from "@/slices/Pricing";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type PricingStoryProps = {
  slice: Content.PricingSlice;
};

const PricingStory = ({ slice }: PricingStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <Pricing slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default PricingStory;
