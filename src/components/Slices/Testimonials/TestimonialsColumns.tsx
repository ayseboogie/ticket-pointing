import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Container } from "@/components/Container.tsx";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

export default function TestimonialsColumns({
  slice,
}: {
  slice: Content.TestimonialsSliceTwoColumnsWithSeparator;
}) {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section id={slice.primary.anchor || undefined}>
      <ThemeContainer theme={slice.primary.theme} className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
                <SuspenseImage
                  image={slice.primary.company_logo_column_1}
                  className="h-12 self-start"
                  height={48}
                />
                <figure className="mt-10 flex flex-auto flex-col justify-between">
                  <blockquote
                    className={`text-lg leading-8 ${
                      themeColor === "dark"
                        ? "text-light-gray"
                        : "text-light-black"
                    }`}
                  >
                    <PrismicRichText
                      field={slice.primary.quote_column_1}
                      components={{
                        paragraph: ({ children }) => <p>{children}</p>,
                      }}
                    />
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-x-6">
                    <SuspenseImage
                      image={slice.primary.author_image_column_1}
                      className="h-14 w-14 rounded-full bg-gray-50"
                      width={56}
                      height={56}
                    />
                    <div className="text-base">
                      <div
                        className={`font-semibold ${
                          themeColor === "dark" ? "text-white" : "text-darkGrey"
                        }`}
                      >
                        <PrismicRichText
                          field={slice.primary.author_column_1}
                          components={{
                            paragraph: ({ children }) => <p>{children}</p>,
                          }}
                        />
                      </div>
                      <div
                        className={`mt-1 ${
                          themeColor === "dark"
                            ? "text-light-gray"
                            : "text-gray-500"
                        }`}
                      >
                        <PrismicRichText
                          field={slice.primary.author_role_column_1}
                          components={{
                            paragraph: ({ children }) => <p>{children}</p>,
                          }}
                        />
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
              <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
                <SuspenseImage
                  image={slice.primary.company_logo_column_1}
                  className="h-12 self-start"
                  height={48}
                />
                <figure className="mt-10 flex flex-auto flex-col justify-between">
                  <blockquote
                    className={`text-lg leading-8 ${
                      themeColor === "dark"
                        ? "text-light-gray"
                        : "text-light-black"
                    }`}
                  >
                    <PrismicRichText
                      field={slice.primary.quote_column_2}
                      components={{
                        paragraph: ({ children }) => <p>{children}</p>,
                      }}
                    />
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-x-6">
                    <SuspenseImage
                      image={slice.primary.author_image_column_2}
                      className="h-14 w-14 rounded-full bg-gray-50"
                      width={56}
                      height={56}
                    />
                    <div className="text-base">
                      <div
                        className={`font-semibold ${
                          themeColor === "dark" ? "text-white" : "text-darkGrey"
                        }`}
                      >
                        <PrismicRichText
                          field={slice.primary.author_column_2}
                          components={{
                            paragraph: ({ children }) => <p>{children}</p>,
                          }}
                        />
                      </div>
                      <div
                        className={`mt-1 ${
                          themeColor === "dark"
                            ? "text-light-gray"
                            : "text-gray-500"
                        }`}
                      >
                        {" "}
                        <PrismicRichText
                          field={slice.primary.author_role_column_2}
                          components={{
                            paragraph: ({ children }) => <p>{children}</p>,
                          }}
                        />
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </Container>
      </ThemeContainer>
    </section>
  );
}
