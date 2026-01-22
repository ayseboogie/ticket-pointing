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

const HeroImage = ({ slice }: HeroSliceImageProps) => {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section
      id={slice.primary.anchor || undefined}
      data-slice-variation={slice.variation}
    >
      <div className={cn("relative isolate overflow-hidden")}>
        {/* Image */}
        {prismicH.isFilled.image(slice.primary.backgroundimage) && (
          <SuspenseImage
            image={slice.primary.backgroundimage}
            fill={true}
            className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center brightness-75"
            width={2245}
            height={1636}
            unoptimized
            priority
          />
        )}
        <Container className="pb-16 pt-20 text-center lg:pt-32">
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
    </section>
  );
};

export default HeroImage;
