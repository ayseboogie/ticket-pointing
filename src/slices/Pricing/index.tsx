import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import PricingDefault from "@/components/Slices/Pricing/PricingDefault.tsx";
import PricingWithPromo from "@/components/Slices/Pricing/PricingWithPromo.tsx";
import PricingWithFilters from "@/components/Slices/Pricing/PricingWithFilters.tsx";

/**
 * Props for `Pricing`.
 */
export type PricingProps = SliceComponentProps<Content.PricingSlice>;

/**
 * Component for "Pricing" Slices.
 */
const Pricing = ({ slice }: PricingProps) => {
  switch (slice.variation) {
    case "default":
      return <PricingDefault slice={slice} />;
    case "withPromo":
      return <PricingWithPromo slice={slice} />;
    case "withFilter":
      return <PricingWithFilters slice={slice} />;
  }
};

export default Pricing;
