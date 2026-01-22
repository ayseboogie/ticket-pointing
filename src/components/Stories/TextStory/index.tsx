import { Content } from "@prismicio/client";
import Text from "@/slices/Text";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type TextStoryProps = {
  slice: Content.TextSlice;
};

const TextStory = ({ slice }: TextStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <Text slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default TextStory;
