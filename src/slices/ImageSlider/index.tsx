"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React from "react";
import ImageSliderCmp from "@/components/Slices/ImageSlider/ImageSliderCmp.tsx";
import ImageSliderwTextCmp from "@/components/Slices/ImageSlider/ImageSliderwTextCmp.tsx";

/**
 * Props for `Slider`.
 */
export type SliderProps = SliceComponentProps<Content.ImageSliderSlice>;

/**
 * Component for "Slider" Slices.
 */
const ImageSlider = ({ slice }: SliderProps) => {
  switch (slice.variation) {
    case "default":
      return <ImageSliderCmp slice={slice} />;
    case "withText":
      return (
        <ImageSliderwTextCmp
          sliceType={slice.slice_type}
          sliceVariation={slice.variation}
          text={slice.primary.text}
          sliceItems={slice.items}
        />
      );
  }
};

export default ImageSlider;
