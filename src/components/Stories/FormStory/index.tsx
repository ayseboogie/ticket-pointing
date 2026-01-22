import { Content } from "@prismicio/client";
import Form from "@/slices/Form";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type FormStoryProps = {
  slice: Content.FormSlice;
};

const FormStory = ({ slice }: FormStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <Form slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default FormStory;
