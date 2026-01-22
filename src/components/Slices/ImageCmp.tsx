import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Bounded from "@/components/Bounded";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

type ImageCmpProps = {
  sliceType: string;
  sliceVariation: string;
  image: prismic.ImageField<never>;
  caption: prismic.RichTextField;
};

const ImageCmp = ({
  sliceType,
  sliceVariation,
  image,
  caption,
}: ImageCmpProps) => {
  return (
    <section data-slice-type={sliceType} data-slice-variation={sliceVariation}>
      <Bounded
        id="image-slice"
        size={sliceVariation === "wide" ? "widest" : "base"}
      >
        <figure className="grid grid-cols-1 gap-6">
          {prismicH.isFilled.image(image) && (
            <div className="bg-gray-100">
              <SuspenseImage image={image} sizes="100vw" className="w-full" />
            </div>
          )}
          {prismicH.isFilled.richText(caption) && (
            <figcaption className="text-center font-serif italic tracking-tight text-slate-500">
              <PrismicRichText field={caption} />
            </figcaption>
          )}
        </figure>
      </Bounded>
    </section>
  );
};

export default ImageCmp;
