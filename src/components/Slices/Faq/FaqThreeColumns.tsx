import type { Content } from "@prismicio/client";
import { Container } from "@/components/Container.tsx";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";

type FaqThreeColumnsProps = {
  slice: Content.FaqSliceThreeColumns | Content.FaqSliceTwoColumns;
  threeCols: boolean;
};

const FaqThreeColumns = ({ slice, threeCols }: FaqThreeColumnsProps) => {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section id={slice.primary.anchor || undefined} aria-labelledby="faq-title">
      <ThemeContainer
        theme={slice.primary.theme}
        className="relative overflow-hidden py-20 sm:py-32"
      >
        <Container className="relative">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2
                    id="faq-title"
                    className={`font-display text-3xl tracking-tight sm:text-4xl ${
                      themeColor === "dark" ? "text-white" : "text-darkGrey"
                    }`}
                  >
                    {children}
                  </h2>
                ),
              }}
            />
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p
                    className={`mt-4 text-lg tracking-tight ${
                      themeColor === "dark"
                        ? "text-light-gray"
                        : "text-light-black"
                    }`}
                  >
                    {children}
                  </p>
                ),
                hyperlink: ({ children, node }) => (
                  <PrismicLink
                    field={node.data}
                    className="font-semibold text-light-blue hover:text-light-blue-70"
                  >
                    {children}
                  </PrismicLink>
                ),
              }}
            />
          </div>
          <div className="mt-12">
            <dl
              className={`${
                threeCols
                  ? "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
                  : "space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10"
              }`}
            >
              {slice.primary.faq?.map((faq, idx) => (
                <div key={idx}>
                  <dt
                    className={`text-base font-semibold leading-7 ${
                      themeColor === "dark" ? "text-white" : "text-darkGrey"
                    }`}
                  >
                    <PrismicRichText
                      field={faq.question}
                      components={{
                        paragraph: ({ children }) => <p>{children}</p>,
                        hyperlink: ({ children, node }) => (
                          <PrismicLink
                            field={node.data}
                            className="font-semibold text-light-blue hover:text-light-blue-70"
                          >
                            {children}
                          </PrismicLink>
                        ),
                      }}
                    />
                  </dt>
                  <dd
                    className={`mt-2 text-base leading-7 ${
                      themeColor === "dark"
                        ? "text-light-gray"
                        : "text-light-black"
                    }`}
                  >
                    <PrismicRichText
                      field={faq.answer}
                      components={{
                        paragraph: ({ children }) => <p>{children}</p>,
                        hyperlink: ({ children, node }) => (
                          <PrismicLink
                            field={node.data}
                            className="font-semibold text-light-blue hover:text-light-blue-70"
                          >
                            {children}
                          </PrismicLink>
                        ),
                      }}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </ThemeContainer>
    </section>
  );
};

export default FaqThreeColumns;
