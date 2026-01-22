import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `NavigationSlice`.
 */
export type NavigationSliceProps =
  SliceComponentProps<Content.NavigationSliceSlice>;

/**
 * Component for "NavigationSlice" Slices.
 */
const NavigationSlice: FC<NavigationSliceProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for navigation_slice (variation: {slice.variation})
      Slices
    </section>
  );
};

export default NavigationSlice;
