"use client";

import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import * as React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Bounded from "@/components/Bounded.tsx";
import {
  ImageSliderSliceWithTextItem,
  Simplify,
} from "../../../../prismicio-types";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

type ImageSliderwTextCmpProps = {
  sliceType: string;
  sliceVariation: string;
  text: prismic.RichTextField;
  sliceItems: Array<Simplify<ImageSliderSliceWithTextItem>>;
};

const ImageSliderwTextCmp = ({
  sliceType,
  sliceVariation,
  text,
  sliceItems,
}: ImageSliderwTextCmpProps) => {
  // options with loop enabled
  const options: EmblaOptionsType = {
    loop: true,
  };
  // to autoplay after drag or arrow button click
  const autoplayOptions = {
    stopOnInteraction: false,
  };

  // carousel ref with carousel options - enabling loop and autoplay options
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);

  return (
    <section data-slice-type={sliceType} data-slice-variation={sliceVariation}>
      <Bounded id="image-slider-w-text" size="widest">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {/* 40% width */}
          <div className="w-full sm:w-2/5 flex items-center justify-center pb-4 sm:pb-0">
            <div className="p-6">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="backface-hidden flex touch-pan-y ml-[-1rem]">
                  {sliceItems.map((slide, index) => (
                    <div
                      className="flex-shrink-0 w-full min-w-0 pl-4 relative"
                      key={index}
                    >
                      <SuspenseImage
                        image={slide.image}
                        sizes="100vw"
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 60% width */}
          <div className="w-full sm:w-3/5 pb-2">
            <div style={{ paddingLeft: "2rem" }}>
              <div className="leading-relaxed sm:text-lg sm:leading-relaxed">
                <PrismicRichText field={text} />
              </div>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default ImageSliderwTextCmp;
