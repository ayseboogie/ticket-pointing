import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import LogoCloudSimple from "@/components/Slices/LogoCloud/LogoCloudSimple.tsx";
import LogoCloudSingle from "@/components/Slices/LogoCloud/LogoCloudSingle.tsx";
import LogoCloudGrid from "@/components/Slices/LogoCloud/LogoCloudGrid.tsx";

/**
 * Props for `LogoCloud`.
 */
export type LogoCloudProps = SliceComponentProps<Content.LogoCloudSlice>;

/**
 * Component for "LogoCloud" Slices.
 */
const LogoCloud = ({ slice }: LogoCloudProps) => {
  switch (slice.variation) {
    case "default":
      return <LogoCloudSimple slice={slice} />;
    case "single":
      return <LogoCloudSingle slice={slice} />;
    case "threeColumns":
      return <LogoCloudGrid slice={slice} />;
  }
};

export default LogoCloud;
