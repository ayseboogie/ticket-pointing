import * as prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import {
  AlternateGridSliceDefaultItem,
  AlternateGridSliceImageRightItem,
  Simplify,
} from "../../../prismicio-types";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

type AlternateGridCmpProps = {
  sliceType: string;
  sliceVariation: string;
  eyebrowHeadline: prismic.KeyTextField;
  title: prismic.RichTextField;
  description: prismic.RichTextField;
  image: prismic.ImageField<never>;
  sliceItems:
    | Array<Simplify<AlternateGridSliceDefaultItem>>
    | Array<Simplify<AlternateGridSliceImageRightItem>>;
};

const AlternateGridCmp = ({
  sliceType,
  sliceVariation,
  eyebrowHeadline,
  title,
  description,
  image,
  sliceItems,
}: AlternateGridCmpProps) => {
  return (
    <section
      id="alternate-grid-slice"
      data-slice-type={sliceType}
      data-slice-variation={sliceVariation}
      className="m-0 min-w-0 relative px-5 py-36"
    >
      <div
        className={`grid gap-6 items-center ${isFilled.image(image) ? "grid-cols-2" : ""}`}
      >
        {isFilled.image(image) && (
          <SuspenseImage
            image={image}
            className={`max-w-full self-center ${
              sliceVariation === "imageRight" ? "order-2" : "order-1"
            }`}
          />
        )}
        <div
          className={`grid gap-8 ${sliceVariation === "imageRight" ? "order-1 pl-24" : "order-2"}`}
        >
          <div className="grid gap-2">
            {isFilled.keyText(eyebrowHeadline) && (
              <div className="text-indigo-500 text-lg font-medium">
                {eyebrowHeadline}
              </div>
            )}
            {isFilled.richText(title) && (
              <div className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
                <PrismicRichText field={title} />
              </div>
            )}
            {isFilled.richText(description) && (
              <div className="text-lg max-w-prose md:text-xl">
                <PrismicRichText field={description} />
              </div>
            )}
          </div>
          {sliceItems.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2">
              {sliceItems.map((item, i) => (
                <div key={`item-${i + 1}`} className="grid content-start">
                  {isFilled.richText(item.title) && (
                    <div className="font-bold text-lg mb-2">
                      <PrismicRichText field={item.title} />
                    </div>
                  )}
                  {isFilled.richText(item.description) && (
                    <div className="text-sm">
                      <PrismicRichText field={item.description} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AlternateGridCmp;
