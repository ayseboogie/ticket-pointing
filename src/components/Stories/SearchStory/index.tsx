import { Content } from "@prismicio/client";
import Search, { SearchProps } from "@/slices/Search";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type SearchStoryProps = {
  slice: Content.SearchSlice;
};

const SearchStory = ({ slice }: SearchStoryProps) => {
  return (
    <StoryBackgroundWrapper slice={slice}>
      <Search {...({ slice } as SearchProps)} />
    </StoryBackgroundWrapper>
  );
};

export default SearchStory;
