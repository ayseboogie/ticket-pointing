import { PrismicRichText } from "@prismicio/react";
import * as React from "react";
import { Content, isFilled } from "@prismicio/client";
import Bounded from "@/components/Bounded.tsx";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";
import {
  TextGridRowSliceCenteredItem,
  TextGridRowSliceDefaultItem,
} from "../../../../prismicio-types";

type TextGridRowCmpProps = {
  slice: Content.TextGridRowSlice;
};

const TextGridRowCmp = ({ slice }: TextGridRowCmpProps) => {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ThemeContainer theme={slice.primary.theme}>
        <Bounded size="widest">
          <div className="w-full flex justify-center">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ${
                slice.variation === "centered" ? "text-center" : ""
              } ${themeColor === "dark" ? "text-white" : "text-darkGrey"}`}
            >
              {slice.items.length > 0 && (
                <>
                  {slice.items.map(
                    (
                      item:
                        | TextGridRowSliceDefaultItem
                        | TextGridRowSliceCenteredItem,
                      i,
                    ) => (
                      <div
                        key={`item-${i + 1}`}
                        className={`p-4 ${
                          slice.variation === "centered" &&
                          i !== slice.items.length - 1 &&
                          "border-cream border-b-2 md:border-r-2 md:border-b-0"
                        }`}
                      >
                        {isFilled.image(item.icon) && (
                          <div className="flex justify-center">
                            <SuspenseImage
                              image={item.icon}
                              className="w-8 h-8"
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
                      </div>
                    ),
                  )}
                </>
              )}
            </div>
          </div>
        </Bounded>
      </ThemeContainer>
    </section>
  );
};

export default TextGridRowCmp;
