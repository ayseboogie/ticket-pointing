import { SliceComponentProps } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import TicketPointingCmp from "@/components/Slices/TicketPointing/TicketPointingCmp";
import { createClient } from "@/prismicio";

/**
 * Props for `TicketPointing`.
 */
export type TicketPointingProps = SliceComponentProps<any>;

/**
 * Component for "TicketPointing" Slices.
 */
const TicketPointing = async ({ slice }: TicketPointingProps) => {
  const client = createClient();
  const footer = await client.getSingle("footer");
  const footerLogo = prismicH.isFilled.image(footer.data.logo)
    ? footer.data.logo
    : undefined;

  return <TicketPointingCmp slice={slice} footerLogo={footerLogo} />;
};

export default TicketPointing;
