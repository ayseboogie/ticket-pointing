import * as React from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import UsePrevNextButtons from "@/components/Slices/ImageSlider/UsePrevNextButtons.tsx";
import PrevButton from "@/components/Slices/ImageSlider/PrevButton.tsx";
import NextButton from "@/components/Slices/ImageSlider/NextButton.tsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { UnderlineDoodle } from "@/components/UnderlineDoodle.tsx";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";

type ImageSliderCmpProps = {
  slice: Content.ImageSliderSliceDefault;
};

const ImageSliderCmp = ({ slice }: ImageSliderCmpProps) => {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  // options with loop enabled
  const options: EmblaOptionsType = {
    loop: true,
  };
  // to autoplay after drag or arrow button click
  const autoplayOptions = {
    stopOnInteraction: false,
    delay: 2000,
  };

  // carousel ref with carousel options - enabling loop and autoplay options
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);

  // arrow button callback
  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins();
    if (!autoplay) return;
    // if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = UsePrevNextButtons(emblaApi, onButtonClick);
  return (
    <section data-slice-variation={slice.variation}>
      <ThemeContainer
        theme={slice.primary.theme}
        className="py-8 md:py-10 md:px-6 lg:py-12"
      >
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none ">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2
                  className={`text-3xl text-center font-display leading-10 tracking-tight ${
                    themeColor === "dark" ? "text-textLight" : "text-darkGrey"
                  }`}
                >
                  {children}
                </h2>
              ),
              heading4: ({ children }) => (
                <h4
                  className={`text-2xl text-center font-display leading-10 tracking-tight mb-4 ${
                    themeColor === "dark" ? "text-textLight" : "text-darkGrey"
                  }`}
                >
                  {children}
                </h4>
              ),
              heading5: ({ children }) => (
                <h5
                  className={`${
                    themeColor === "dark" ? "text-textLight" : "text-darkGrey"
                  }`}
                >
                  {children}
                </h5>
              ),
              heading6: ({ children }) => (
                <h6
                  className={`${
                    themeColor === "dark" ? "text-textLight" : "text-darkGrey"
                  }`}
                >
                  {children}
                </h6>
              ),
              strong: ({ children }) => {
                return (
                  <>
                    <span
                      className={`relative whitespace-nowrap ${
                        themeColor === "dark"
                          ? "text-textLight"
                          : "text-vibrant-blue"
                      }`}
                    >
                      <UnderlineDoodle
                        className={`absolute left-0 top-2/3 h-[0.58em] w-full ${
                          themeColor === "dark"
                            ? "fill-white"
                            : "fill-blue-300/70"
                        }`}
                      />
                      <span className="relative">{children}</span>
                    </span>
                  </>
                );
              },
            }}
          />
        </div>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y pinch-zoom">
            {/* mapping over images */}
            {slice.items.map((slide, index) => {
              return (
                <div
                  className="flex-[0_0_80%] sm:flex-[0_0_70%] lg:flex-[0_0_35%] xl:flex-[0_0_30%] pl-4"
                  key={index}
                >
                  <div className="relative w-full h-64">
                    <SuspenseImage
                      image={slide.image}
                      className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/*<div id="arrow-buttons" className="hidden md:flex justify-center">*/}
        {/*  <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />*/}
        {/*  <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />*/}
        {/*</div>*/}
      </ThemeContainer>
    </section>
  );
};

export default ImageSliderCmp;
