import { Content } from "@prismicio/client";
import NavigationSlice, {
  NavigationSliceProps,
} from "@/slices/NavigationSlice";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type NavigationSliceStoryProps = {
  slice: Content.NavigationSliceSlice;
};

const NavigationSliceStory = ({ slice }: NavigationSliceStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <NavigationSlice {...({ slice } as NavigationSliceProps)} />
    </StoryBackgroundWrapper>
  );
};

export default NavigationSliceStory;
