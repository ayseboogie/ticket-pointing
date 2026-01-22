import { FooterDocumentData } from "../../../../prismicio-types";
import Footer from "@/components/Layout/Footer.tsx";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type FooterStoryProps = {
  footer: FooterDocumentData;
};

const FooterStory = ({ footer }: FooterStoryProps) => {
  return (
    <StoryBackgroundWrapper>
      <Footer footer={footer} />
    </StoryBackgroundWrapper>
  );
};

export default FooterStory;
