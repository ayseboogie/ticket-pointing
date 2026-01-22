import type * as prismic from "@prismicio/client";
import MapCmp from "@/components/Slices/MapCmp";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type MapStoryProps = {
  sliceType: string;
  sliceVariation: string;
  mapUrl: prismic.KeyTextField;
  title: prismic.RichTextField;
};

const MapStory = ({
  sliceType,
  sliceVariation,
  mapUrl,
  title,
}: MapStoryProps) => {
  return (
    <StoryBackgroundWrapper>
      <MapCmp
        sliceType={sliceType}
        sliceVariation={sliceVariation}
        mapUrl={mapUrl}
        title={title}
      />
    </StoryBackgroundWrapper>
  );
};

export default MapStory;
