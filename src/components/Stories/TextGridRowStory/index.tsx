import TextGridRowCmp from "@/components/Slices/TextGridRow/TextGridRowCmp.tsx";
import { Content } from "@prismicio/client";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type TextGridRowStoryProps = {
  slice: Content.TextGridRowSlice;
};

const TextGridRowStory = ({ slice }: TextGridRowStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <TextGridRowCmp slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default TextGridRowStory;
