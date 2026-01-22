import * as prismic from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import cn from "classnames";
import styles from "@/components/AlgoliaStyles/algoliaTheme.module.css";
import { CardGridSliceDefaultItem, Simplify } from "../../../prismicio-types";
import { HeadingWrapper } from "@/components/HeadingWrapper";
import { ConditionalWrap } from "@/components/ConditionalWrap";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

type CardGridCmpProps = {
  sliceType: string;
  sliceVariation: string;
  heading: prismic.RichTextField;
  sliceItems: Array<Simplify<CardGridSliceDefaultItem>>;
};

const CardGridCmp = ({
  sliceType,
  sliceVariation,
  heading,
  sliceItems,
}: CardGridCmpProps) => {
  return (
    <section
      id="card-grid-slice"
      data-slice-type={sliceType}
      data-slice-variation={sliceVariation}
    >
      <div className="grid gap-10 px-4 md:px-20 pt-20">
        {prismic.isFilled.richText(heading) && (
          <HeadingWrapper className="text-center">
            <PrismicText field={heading} />
          </HeadingWrapper>
        )}
        <ul className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 xl:grid-cols-4">
          {sliceItems.map((item, index) => (
            <li key={index} className="grid gap-8">
              <div
                className={cn("relative w-full mx-1 md:mx-3", styles.container)}
              >
                <div className="tracking-wide text-base text-center md:hidden">
                  <PrismicRichText field={item.text} />
                </div>
                {prismic.isFilled.image(item.image) && (
                  <div>
                    <ConditionalWrap
                      condition={prismic.isFilled.link(item.link)}
                      wrap={({ children }: any) => (
                        <PrismicNextLink field={item.link} tabIndex={-1}>
                          {children}
                        </PrismicNextLink>
                      )}
                    >
                      <SuspenseImage
                        image={item.image}
                        sizes="100vw"
                        className={`w-full h-[300px] object-cover ${styles.image}`}
                      />
                    </ConditionalWrap>
                  </div>
                )}
                <div
                  className={`absolute text-center opacity-0 transition-opacity duration-500 ease-in ${styles.hoverText}`}
                  style={{
                    top: "27%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="tracking-wide text-sm md:text-2xl">
                    <PrismicRichText field={item.text} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CardGridCmp;
