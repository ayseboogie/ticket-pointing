import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import VideoCmp from "@/components/Slices/VideoCmp";

export type VideoProps = SliceComponentProps<Content.VideoSlice>;

const Video = ({ slice }: VideoProps) => {
  return (
    <VideoCmp
      sliceType={slice.slice_type}
      sliceVariation={slice.variation}
      video={slice.primary.video}
      caption={slice.primary.caption}
    />
  );
};

export default Video;
