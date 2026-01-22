import { Content } from "@prismicio/client";
import ImageSlider from "@/slices/ImageSlider";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type ImageSliderStoryProps = {
  slice: Content.ImageSliderSlice;
};

const ImageSliderStory = ({ slice }: ImageSliderStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <ImageSlider slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default ImageSliderStory;
