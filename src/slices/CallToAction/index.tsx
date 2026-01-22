import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import CtaSimple from "@/components/Slices/CallToAction/CtaSimple.tsx";
import CtaWithImage from "@/components/Slices/CallToAction/CtaWithImage.tsx";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps) => {
  switch (slice.variation) {
    case "default":
      return <CtaSimple slice={slice} withBackground={true} />;
    case "withImageRight":
      return <CtaWithImage slice={slice} imageRight={true} />;
    case "withImageLeft":
      return <CtaWithImage slice={slice} imageRight={false} />;
  }
};

export default CallToAction;
