import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import TestimonialsMasonry from "@/components/Slices/Testimonials/TestimonialsMasonry.tsx";
import TestimonialsScrollingCards from "@/components/Slices/Testimonials/TestimonialsScrollingCards.tsx";
import TestimonialsColumns from "@/components/Slices/Testimonials/TestimonialsColumns.tsx";
import TestimonialsSingle from "@/components/Slices/Testimonials/TestimonialsSingle.tsx";

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = ({ slice }: TestimonialsProps) => {
  switch (slice.variation) {
    case "default":
      return <TestimonialsMasonry slice={slice} />;
    case "scrollingCards":
      return <TestimonialsScrollingCards slice={slice} />;
    case "twoColumnsWithSeparator":
      return <TestimonialsColumns slice={slice} />;
    case "singleCentered":
      return <TestimonialsSingle slice={slice} />;
    case "singleWithLargeImage":
      return <TestimonialsSingle slice={slice} />;
  }
};

export default Testimonials;
