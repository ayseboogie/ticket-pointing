import { Content } from "@prismicio/client";
import Testimonials from "@/slices/Testimonials";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type TestimonialsStoryProps = {
  slice: Content.TestimonialsSlice;
};

const TestimonialsStory = ({ slice }: TestimonialsStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <Testimonials slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default TestimonialsStory;
