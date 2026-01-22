import * as prismic from "@prismicio/client";
import { Suspense } from "react";
import { PrismicNextImage } from "@prismicio/next";
import LoadingSpinner from "@/components/LoadingSpinner.tsx";

type SuspenseImageProps = {
  image: prismic.ImageField;
  className?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  unoptimized?: boolean;
  priority?: boolean;
};

const SuspenseImage = ({
  image,
  className,
  sizes,
  fill,
  width,
  height,
  unoptimized = false,
  priority = false,
}: SuspenseImageProps) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PrismicNextImage
        field={image}
        className={className}
        sizes={sizes}
        fill={fill}
        width={width}
        height={height}
        unoptimized={unoptimized}
        priority={priority}
      />
    </Suspense>
  );
};
export default SuspenseImage;
