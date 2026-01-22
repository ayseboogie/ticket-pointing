import { PrismicLink, PrismicRichText } from "@prismicio/react";
import * as React from "react";
import { Content, isFilled } from "@prismicio/client";
import { TextGridRowSliceCenteredLinksItem } from "../../../../prismicio-types";
import Bounded from "@/components/Bounded.tsx";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

type TextGridRowLinkCmpProps = {
  slice: Content.TextGridRowSliceCenteredLinks;
};

const TextGridRowLink = ({ slice }: TextGridRowLinkCmpProps) => {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";
  console.log("slice ", slice);

  return (
    <section data-slice-variation={slice.variation}>
      <ThemeContainer theme={slice.primary.theme}>
        <Bounded size="widest">
          <div className="w-full flex justify-center ">
            <div
              className={`flex flex-col md:flex-row flex-wrap justify-center w-full  ${slice.variation === "centeredLinks" ? "text-center" : ""}
               ${themeColor === "dark" ? "text-white" : "text-darkGrey"}`}
            >
              {slice.items?.map(
                (item: TextGridRowSliceCenteredLinksItem, index) => (
                  <div
                    key={index}
                    className={`p-4 flex-1 ${
                      slice.variation === "centeredLinks" &&
                      index !== slice.items.length - 1 &&
                      "border-cream border-b-2 md:border-r-2 md:border-b-0"
                    }`}
                  >
                    <PrismicLink field={item.link}>
                      {isFilled.image(item.icon) && (
                        <div className="flex justify-center ">
                          <SuspenseImage
                            image={item.icon}
                            className="w-8 h-8 invert"
                          />
                        </div>
                      )}
                      {isFilled.keyText(item.heading) && (
                        <div className="text-xl">{item.heading}</div>
                      )}
                      {isFilled.richText(item.text) && (
                        <div className="text-sm">
                          <PrismicRichText field={item.text} />
                        </div>
                      )}
                    </PrismicLink>
                  </div>
                ),
              )}
            </div>
          </div>
        </Bounded>
      </ThemeContainer>
    </section>
  );
};

export default TextGridRowLink;
