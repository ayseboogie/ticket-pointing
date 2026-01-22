import HeroImage from "@/components/Slices/Hero/HeroImage";
import { Content } from "@prismicio/client";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type HeroStoryProps = {
  slice: Content.HeroSliceImageDefault | Content.HeroSliceImageTitleOnly;
};

const HeroStory = ({ slice }: HeroStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <HeroImage slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default HeroStory;
