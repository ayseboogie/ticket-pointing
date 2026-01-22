import { Content } from "@prismicio/client";
import LogoCloud, { LogoCloudProps } from "@/slices/LogoCloud";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type LogoCloudStoryProps = {
  slice: Content.LogoCloudSlice;
};

const LogoCloudStory = ({ slice }: LogoCloudStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <LogoCloud {...({ slice } as LogoCloudProps)} />
    </StoryBackgroundWrapper>
  );
};

export default LogoCloudStory;
