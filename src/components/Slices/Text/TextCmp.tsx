import { PrismicLink, PrismicRichText } from "@prismicio/react";
import * as React from "react";
import * as prismicH from "@prismicio/helpers";
import Bounded from "@/components/Bounded.tsx";
import { Content } from "@prismicio/client";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export type TextCmpProps = {
  slice: Content.TextSliceDefault | Content.TextSliceCenter;
};

const TextCmp = ({ slice }: TextCmpProps) => {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section data-slice-variation={slice.variation}>
      <ThemeContainer
        theme={slice.primary.theme}
        className="relative overflow-hidden"
      >
        <Bounded
          id="text-slice"
          size="wide"
          className={slice.variation === "center" ? "text-center" : "null"}
        >
          {prismicH.isFilled.richText(slice.primary.text) && (
            <div className="text-lg tracking-widest m-auto md:py-8">
              <PrismicRichText
                field={slice.primary.text}
                components={{
                  heading2: ({ children }) => (
                    <h2
                      className={`mt-12 mb-6 font-display text-3xl tracking-tight sm:text-4xl  ${
                        themeColor === "dark"
                          ? "text-textLight"
                          : "text-textMain"
                      }`}
                    >
                      {children}
                    </h2>
                  ),
                  heading3: ({ children }) => (
                    <h3
                      className={`mt-10 mb-6 font-display text-2xl tracking-tight ${
                        themeColor === "dark"
                          ? "text-textLight"
                          : "text-textMain"
                      } sm:text-3xl`}
                    >
                      {children}
                    </h3>
                  ),
                  heading4: ({ children }) => (
                    <h4
                      className={`mt-10 mb-4 font-display text-xl tracking-tight ${
                        themeColor === "dark"
                          ? "text-textLight"
                          : "text-textMain"
                      } sm:text-2xl`}
                    >
                      {children}
                    </h4>
                  ),
                  heading5: ({ children }) => (
                    <h5
                      className={`mt-10 mb-4 font-display text-lg tracking-tight ${
                        themeColor === "dark"
                          ? "text-textLight"
                          : "text-textMain"
                      } sm:text-xl`}
                    >
                      {children}
                    </h5>
                  ),
                  heading6: ({ children }) => (
                    <h6
                      className={`mt-10 mb-4 font-display text-md tracking-tight ${
                        themeColor === "dark"
                          ? "text-textLight"
                          : "text-textMain"
                      } sm:text-lg`}
                    >
                      {children}
                    </h6>
                  ),
                  paragraph: ({ children }) => (
                    <p
                      className={`mb-4 prose-lg tracking-tight ${
                        themeColor === "dark"
                          ? "text-textLight"
                          : "text-textMain"
                      }`}
                    >
                      {children}
                    </p>
                  ),
                  preformatted: ({ node }) => (
                    <pre className="my-3 p-2 md:p-6 bg-[#0d1117] rounded-xl shadow-lg">
                      <SyntaxHighlighter
                        style={dark}
                        customStyle={{
                          backgroundColor: "#0d1117",
                          borderColor: "#0d1117",
                        }}
                      >
                        {node.text}
                      </SyntaxHighlighter>
                    </pre>
                  ),
                  list: ({ children }) => (
                    <ul
                      role="list"
                      className="marker:text-vibrant-blue list-inside	list-disc prose-lg"
                    >
                      {children}
                    </ul>
                  ),
                  listItem: ({ children }) => (
                    <li className="mb-4">{children}</li>
                  ),
                  oList: ({ children }) => (
                    <ol
                      role="list"
                      className="marker:text-vibrant-blue list-inside list-decimal prose-lg"
                    >
                      {children}
                    </ol>
                  ),
                  oListItem: ({ children }) => (
                    <li className="mb-4">{children}</li>
                  ),
                  image: ({ node }) =>
                    node.linkTo
                      ? `[![${node.alt}](${node.url})](${node.linkTo.url})\n\n`
                      : `![${node.alt}](${node.url})\n\n`,
                  embed: ({ node }) => (
                    <div
                      data-oembed={node.oembed.embed_url}
                      data-oembed-type={node.oembed.type}
                      data-oembed-provider={node.oembed.provider_name}
                      // {label(node)}
                      dangerouslySetInnerHTML={{
                        __html: node.oembed.html ?? "",
                      }}
                      className={`${
                        node.oembed.type === "video" && "youtube-video"
                      } rounded`}
                    ></div>
                  ),
                  hyperlink: ({ children, node }) => (
                    <PrismicLink
                      field={node.data}
                      className="font-semibold text-vibrant-blue underline underline-offset-2 hover:text-light-blue"
                    >
                      {children}
                    </PrismicLink>
                  ),
                  label: ({ node, children }) => {
                    return (
                      <>
                        {node.data.label === "highlight" && (
                          <span className="text-blue-600">{children}</span>
                        )}
                        {node.data.label === "inline code" && (
                          <span className="px-2 py-1 bg-[#f1f1f8] font-code rounded text-sm font-semibold text-black">
                            {children}
                          </span>
                        )}
                      </>
                    );
                  },
                }}
              />
            </div>
          )}
        </Bounded>
      </ThemeContainer>
    </section>
  );
};

export default TextCmp;
