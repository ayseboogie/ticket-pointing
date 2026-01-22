import { Content } from "@prismicio/client";
import CallToAction from "@/slices/CallToAction";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type CallToActionStoryProps = {
  slice: Content.CallToActionSlice;
};

const CallToActionStory = ({ slice }: CallToActionStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <CallToAction slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default CallToActionStory;
