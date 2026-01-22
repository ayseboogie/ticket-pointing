import type * as prismic from "@prismicio/client";
import CustomerLogosCmp from "@/components/Slices/CustomerLogosCmp";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type CustomerLogosStoryProps = {
  sliceType: string;
  sliceVariation: string;
  eyebrowHeadline: prismic.RichTextField;
  logos: prismic.GroupField;
  callToActionLink: prismic.LinkField;
};

const CustomerLogosStory = ({
  sliceType,
  sliceVariation,
  eyebrowHeadline,
  logos,
  callToActionLink,
}: CustomerLogosStoryProps) => {
  return (
    <StoryBackgroundWrapper>
      <CustomerLogosCmp
        sliceType={sliceType}
        sliceVariation={sliceVariation}
        eyebrowHeadline={eyebrowHeadline}
        logos={logos}
        callToActionLink={callToActionLink}
      />
    </StoryBackgroundWrapper>
  );
};

export default CustomerLogosStory;
