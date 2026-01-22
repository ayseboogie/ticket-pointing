import type * as prismic from "@prismicio/client";
import ImageCmp from "@/components/Slices/ImageCmp";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type ImageStoryProps = {
  sliceType: string;
  sliceVariation: string;
  image: prismic.ImageField<never>;
  caption: prismic.RichTextField;
};

const ImageStory = ({
  sliceType,
  sliceVariation,
  image,
  caption,
}: ImageStoryProps) => {
  return (
    <StoryBackgroundWrapper>
      <ImageCmp
        sliceType={sliceType}
        sliceVariation={sliceVariation}
        image={image}
        caption={caption}
      />
    </StoryBackgroundWrapper>
  );
};

export default ImageStory;
