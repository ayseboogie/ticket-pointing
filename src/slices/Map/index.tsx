import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import MapCmp from "@/components/Slices/MapCmp";

/**
 * Props for `Map`.
 */
export type MapProps = SliceComponentProps<Content.MapSlice>;

/**
 * Component for "Map" Slices.
 */
const Map: FC<MapProps> = ({ slice }) => {
  return (
    <MapCmp
      sliceType={slice.slice_type}
      sliceVariation={slice.variation}
      mapUrl={slice.primary.map_url}
      title={slice.primary.title}
    />
  );
};

export default Map;
