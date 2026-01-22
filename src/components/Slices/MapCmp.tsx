import * as prismic from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { HeadingWrapper } from "@/components/HeadingWrapper";

type MapCmpProps = {
  sliceType: string;
  sliceVariation: string;
  mapUrl: prismic.KeyTextField;
  title: prismic.RichTextField;
};

const MapCmp = ({ sliceType, sliceVariation, mapUrl, title }: MapCmpProps) => {
  return (
    <section data-slice-type={sliceType} data-slice-variation={sliceVariation}>
      <Bounded size="wide" className="mb-20">
        <div className="w-full flex justify-center">
          <HeadingWrapper size="5xl" className="pb-2">
            <PrismicText field={title} />
          </HeadingWrapper>
        </div>
        <div className="flex flex-col md:flex-row gap-8 h-[8rem] md:h-[25rem]">
          <div className="min-w-full w-full lg:min-w-[75%] relative">
            <div className="absolute inset-0">
              <div className="relative w-full overflow-hidden pt-[55%]">
                {mapUrl && (
                  <iframe
                    src={mapUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default MapCmp;
