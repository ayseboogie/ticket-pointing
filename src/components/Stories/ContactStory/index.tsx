import type * as prismic from "@prismicio/client";
import ContactCmp from "@/components/Slices/Contact/ContactCmp";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type ContactStoryProps = {
  sliceType: string;
  sliceVariation: string;
  title: prismic.RichTextField;
  postSendMessage: prismic.RichTextField;
};

const ContactStory = ({
  sliceType,
  sliceVariation,
  title,
  postSendMessage,
}: ContactStoryProps) => {
  return (
    <StoryBackgroundWrapper>
      <ContactCmp
        sliceType={sliceType}
        sliceVariation={sliceVariation}
        title={title}
        postSendMessage={postSendMessage}
      />
    </StoryBackgroundWrapper>
  );
};

export default ContactStory;
