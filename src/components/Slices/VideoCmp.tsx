import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import Bounded from "@/components/Bounded";

type CmpProps = {
  sliceType: string;
  sliceVariation: string;
  video: prismic.EmbedField;
  caption: prismic.RichTextField;
};

const Cmp = ({ sliceType, sliceVariation, video, caption }: CmpProps) => {
  // dangerouslySetInnerHTML iframe
  const html = video.html;
  // character number of where to start the substring
  const indexStart = html ? html?.indexOf("src=") + 5 : 0;
  // taken from indexStart to end
  const postIndex = html?.substring(indexStart);
  // take postIndex string and split at ending "
  const myArray = postIndex?.split('"');
  // take text before split, ie, src
  const mySrc = myArray && myArray[0];

  return (
    <section data-slice-type={sliceType} data-slice-variation={sliceVariation}>
      <Bounded size="wide" className="mb-9">
        <div className="flex flex-col md:flex-row gap-8 h-[20rem]">
          <div className="min-w-full w-full lg:min-w-[75%] relative">
            <div className="absolute inset-0">
              <div className="relative w-full overflow-hidden pt-[55%]">
                <iframe
                  src={mySrc}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={caption?.toString()}
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
                ></iframe>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/4 flex items-center justify-center flex-wrap pt-[55%] md:pt-0">
            {isFilled.richText(caption) && <PrismicRichText field={caption} />}
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Cmp;
