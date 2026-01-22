import cn from "classnames";
import styles from "@/components/AlgoliaStyles/algoliaTheme.module.css";
import Link from "next/link";
import React from "react";
import { useHits, UseHitsProps } from "react-instantsearch";
import { BaseHit } from "instantsearch.js";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";
import { ImageFieldImage, isFilled } from "@prismicio/client";

// Custom Hits Grid
interface HitType extends BaseHit {
  objectID: string;
  title: string;
  slug?: string;
  featured_image: ImageFieldImage | null | undefined;
  publish_date?: string;
  excerpt?: string;
  uid?: string;
  category?: string;
}

const CustomHits = (props: UseHitsProps<HitType>) => {
  const { items, sendEvent } = useHits<HitType>(props);

  return (
    <ul className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 xl:grid-cols-3 py-4">
      {items.map((hit) => {
        return (
          <li
            key={hit.objectID}
            onClick={() => sendEvent("click", hit, "Hit Clicked")}
            onAuxClick={() => sendEvent("click", hit, "Hit Clicked")}
            className="grid gap-8"
          >
            <div
              className={cn("relative w-full mx-1 md:mx-3", styles.container)}
            >
              <div className="tracking-wide text-base text-center md:hidden">
                {hit.title}
              </div>
              <div>
                <Link href={hit.slug ?? ""}>
                  {isFilled.image(hit.featured_image) && (
                    <SuspenseImage
                      image={hit.featured_image}
                      sizes="100vw"
                      className={`w-full h-full object-cover ${styles.image}`}
                    />
                  )}
                </Link>
              </div>
              <div
                className={`absolute text-center opacity-0 transition-opacity duration-500 ease-in ${styles.hoverText}`}
                style={{
                  top: "27%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="tracking-wide text-sm md:text-2xl">
                  {hit.title}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CustomHits;
