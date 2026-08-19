import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Container } from "@/components/Container.tsx";
import { UnderlineDoodle } from "@/components/UnderlineDoodle.tsx";
import { Button } from "@/components/Button.tsx";
import cn from "classnames";
import * as prismicH from "@prismicio/helpers";
import SuspenseImage from "@/components/Suspense/SuspenseImage";

type HeroSliceImageProps = {
  slice: Content.HeroSliceImageDefault | Content.HeroSliceImageTitleOnly;
};

const mastheadWaveClip =
  "polygon(0% 0%, 100% 0%, 100% calc(100% - 3rem), 97.22% calc(100% - 2.799rem), 94.44% calc(100% - 2.250rem), 91.67% calc(100% - 1.500rem), 88.89% calc(100% - 0.750rem), 86.11% calc(100% - 0.201rem), 83.33% 100%, 80.56% calc(100% - 0.201rem), 77.78% calc(100% - 0.750rem), 75% calc(100% - 1.500rem), 72.22% calc(100% - 2.250rem), 69.44% calc(100% - 2.799rem), 66.67% calc(100% - 3rem), 63.89% calc(100% - 2.799rem), 61.11% calc(100% - 2.250rem), 58.33% calc(100% - 1.500rem), 55.56% calc(100% - 0.750rem), 52.78% calc(100% - 0.201rem), 50% 100%, 47.22% calc(100% - 0.201rem), 44.44% calc(100% - 0.750rem), 41.67% calc(100% - 1.500rem), 38.89% calc(100% - 2.250rem), 36.11% calc(100% - 2.799rem), 33.33% calc(100% - 3rem), 30.56% calc(100% - 2.799rem), 27.78% calc(100% - 2.250rem), 25% calc(100% - 1.500rem), 22.22% calc(100% - 0.750rem), 19.44% calc(100% - 0.201rem), 16.67% 100%, 13.89% calc(100% - 0.201rem), 11.11% calc(100% - 0.750rem), 8.33% calc(100% - 1.500rem), 5.56% calc(100% - 2.250rem), 2.78% calc(100% - 2.799rem), 0% calc(100% - 3rem))";

const mastheadWavePath =
  "M0 0L33.3 3.22L66.7 12L100 24L133.3 36L166.7 44.78L200 48L233.3 44.78L266.7 36L300 24L333.3 12L366.7 3.22L400 0L433.3 3.22L466.7 12L500 24L533.3 36L566.7 44.78L600 48L633.3 44.78L666.7 36L700 24L733.3 12L766.7 3.22L800 0L833.3 3.22L866.7 12L900 24L933.3 36L966.7 44.78L1000 48L1033.3 44.78L1066.7 36L1100 24L1133.3 12L1166.7 3.22L1200 0Z";

const HeroImage = ({ slice }: HeroSliceImageProps) => {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section
      id={slice.primary.anchor || undefined}
      data-slice-variation={slice.variation}
      className="relative z-10"
    >
      <div
        className={cn(
          "relative min-h-[20vh] overflow-hidden md:min-h-[35vh] lg:min-h-[45vh]",
        )}
        style={{
          clipPath: mastheadWaveClip,
        }}
      >
        {/* Image */}
        {prismicH.isFilled.image(slice.primary.backgroundimage) && (
          <SuspenseImage
            image={slice.primary.backgroundimage}
            fill={true}
            className="absolute inset-0 h-full w-full object-cover object-right md:object-center brightness-75"
            width={2245}
            height={1636}
            unoptimized
            priority
          />
        )}
        <Container className="pb-20 pt-20 text-center lg:pt-32">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children }) => (
                <h1
                  className={`mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight ${
                    themeColor === "dark" ? "text-white" : "text-darkGrey"
                  } sm:text-7xl`}
                >
                  {children}
                </h1>
              ),
              strong: ({ children }) => {
                return (
                  <>
                    <span
                      className={`relative whitespace-nowrap ${
                        themeColor === "dark"
                          ? "text-white"
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
          {slice.variation === "imageDefault" && (
            <>
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => (
                    <p
                      className={`mx-auto mt-6 max-w-2xl text-lg tracking-tight ${
                        themeColor === "dark" ? "text-white" : "text-darkGrey"
                      }`}
                    >
                      {children}
                    </p>
                  ),
                }}
              />
              <div className="mt-10 flex justify-center gap-x-6">
                {slice.primary.buttons?.map((item, idx) => {
                  return item.cta_type === "Primary" ? (
                    <Button
                      key={idx}
                      field={item.cta_link}
                      variant="solid"
                      color={`${themeColor === "dark" ? "white" : "slate"}`}
                    >
                      {item.cta_label}
                    </Button>
                  ) : item.cta_type === "Secondary" ? (
                    <Button key={idx} field={item.cta_link} variant="outline">
                      <svg
                        aria-hidden="true"
                        className="h-3 w-3 flex-none fill-light-blue group-active:fill-current"
                      >
                        <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
                      </svg>
                      <span
                        className={`ml-3 ${
                          themeColor === "dark" && "text-white"
                        }`}
                      >
                        {item.cta_label}
                      </span>
                    </Button>
                  ) : (
                    <Button
                      key={idx}
                      field={item.cta_link}
                      variant="link"
                      color={`${themeColor === "dark" ? "white" : "slate"}`}
                    >
                      <span
                        className={`${themeColor === "dark" && "text-white"}`}
                      >
                        {item.cta_label}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </>
          )}
        </Container>
      </div>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full overflow-visible text-black"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d={mastheadWavePath} />
      </svg>
    </section>
  );
};

export default HeroImage;
