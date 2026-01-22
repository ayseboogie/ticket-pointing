import { Content } from "@prismicio/client";
import ImageBesideText from "@/slices/ImageBesideText";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type ImageBesideTextStoryProps = {
  slice: Content.ImageBesideTextSlice;
};

const ImageBesideTextStory = ({ slice }: ImageBesideTextStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <ImageBesideText slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default ImageBesideTextStory;
