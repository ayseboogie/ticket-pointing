import { Content } from "@prismicio/client";
import JobList from "@/slices/JobList";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type JobListStoryProps = {
  slice: Content.JobListSlice;
};

const JobListStory = ({ slice }: JobListStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <JobList slice={slice} />
    </StoryBackgroundWrapper>
  );
};

export default JobListStory;
