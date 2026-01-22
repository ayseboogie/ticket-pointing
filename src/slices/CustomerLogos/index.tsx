import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import CustomerLogosCmp from "@/components/Slices/CustomerLogosCmp.tsx";

export type CustomerLogosProps =
  SliceComponentProps<Content.CustomerLogosSlice>;

const CustomerLogos: FC<CustomerLogosProps> = ({ slice }) => {
  return (
    <CustomerLogosCmp
      sliceType={slice.slice_type}
      sliceVariation={slice.variation}
      eyebrowHeadline={slice.primary.eyebrowHeadline}
      logos={slice.primary.logos}
      callToActionLink={slice.primary.callToActionLink}
    />
  );
};

export default CustomerLogos;
