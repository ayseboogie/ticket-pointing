import { Content } from "@prismicio/client";
import Team from "@/slices/Team";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type TeamStoryProps = {
  slice: Content.TeamSlice;
};

const TeamStory = ({ slice }: TeamStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <Team slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default TeamStory;
