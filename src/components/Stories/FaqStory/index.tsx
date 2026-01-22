import { Content } from "@prismicio/client";
import Faq from "@/slices/Faq";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type FaqStoryProps = {
  slice: Content.FaqSlice;
};

const FaqStory = ({ slice }: FaqStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <Faq slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default FaqStory;
