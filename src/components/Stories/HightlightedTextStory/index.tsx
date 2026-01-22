import { Content } from "@prismicio/client";
import HightlightedText from "@/slices/HightlightedText";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type HightlightedTextStoryProps = {
  slice: Content.HightlightedTextSlice;
};

const HightlightedTextStory = ({ slice }: HightlightedTextStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <HightlightedText slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default HightlightedTextStory;
