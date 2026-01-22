import type * as prismic from "@prismicio/client";
import VideoCmp from "@/components/Slices/VideoCmp";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type VideoStoryProps = {
  sliceType: string;
  sliceVariation: string;
  video: prismic.EmbedField;
  caption: prismic.RichTextField;
};

const VideoStory = ({
  sliceType,
  sliceVariation,
  video,
  caption,
}: VideoStoryProps) => {
  return (
    <StoryBackgroundWrapper>
      <VideoCmp
        sliceType={sliceType}
        sliceVariation={sliceVariation}
        video={video}
        caption={caption}
      />
    </StoryBackgroundWrapper>
  );
};

export default VideoStory;
