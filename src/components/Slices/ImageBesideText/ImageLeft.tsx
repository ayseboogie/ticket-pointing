import { PrismicRichText, PrismicText } from "@prismicio/react";
import * as React from "react";
import { HeadingWrapper } from "@/components/HeadingWrapper.tsx";
import Bounded from "@/components/Bounded.tsx";
import { Content, isFilled } from "@prismicio/client";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

type ImageLeftTextRightCmpProps = {
  slice: Content.ImageBesideTextSlice;
};

const ImageLeft = ({ slice }: ImageLeftTextRightCmpProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded id="image-left-text-slice" size="widest">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {/* 40% width */}
          <div className="w-full md:w-1/3 pb-2 md:pb-0">
            <div className="aspect-video mx-auto max-w-xs">
              <SuspenseImage
                image={slice.primary.image}
                className="object-cover w-full h-auto"
              />
            </div>
          </div>

          {/* 60% width */}
          <div className="w-full md:w-3/5 pb-2">
            <div style={{ paddingLeft: "2rem" }}>
              {/* title */}
              <HeadingWrapper size="5xl" className="pb-2">
                <PrismicText field={slice.primary.title} />
              </HeadingWrapper>
              {/* subtitle */}
              {isFilled.keyText(slice.primary.subtitle) && (
                <div className="text-lg font-medium">
                  {slice.primary.subtitle}
                </div>
              )}
              {/* body text */}
              <div className="leading-relaxed md:text-lg md:leading-relaxed mt-8">
                <PrismicRichText field={slice.primary.description} />
              </div>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default ImageLeft;
