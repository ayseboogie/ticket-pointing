import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Container } from "@/components/Container.tsx";
import { QuoteIcon } from "@/components/QuoteIcon.tsx";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

export default function TestimonialsMasonry({
  slice,
}: {
  slice: Content.TestimonialsSliceDefault;
}) {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section
      id={slice.primary.anchor || undefined}
      aria-label="What our customers are saying"
    >
      <ThemeContainer theme={slice.primary.theme} className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl sm:text-center">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2
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
              }}
            />
          </div>
          <ul className="mx-auto mt-16 max-w-2xl w-full lg:columns-3 sm:columns-2 md:gap-6 sm:gap-8 lg:mt-20 lg:max-w-6xl xl:max-w-7xl">
            {slice?.primary.quotes?.map((item, idx) => (
              <li
                key={idx}
                className="mb-8 xl:w-96 sm:w-80 xs:w-72 sm:space-x-4 break-inside-avoid"
              >
                <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                  <QuoteIcon className="absolute left-6 top-6 fill-slate-100" />
                  <blockquote className="relative">
                    <PrismicRichText
                      field={item.quote}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="text-lg tracking-tight text-slate-900">
                            {children}
                          </p>
                        ),
                      }}
                    />
                  </blockquote>
                  <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6 text-left">
                    <div>
                      <div className="font-display text-base text-slate-900">
                        <PrismicRichText
                          field={item.author}
                          components={{
                            paragraph: ({ children }) => <p>{children}</p>,
                          }}
                        />
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        <PrismicRichText
                          field={item.author_role}
                          components={{
                            paragraph: ({ children }) => <p>{children}</p>,
                          }}
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-full bg-slate-50">
                      <SuspenseImage
                        image={item.author_image}
                        className="h-14 w-14 object-cover"
                        width={56}
                        height={56}
                      />
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </ThemeContainer>
    </section>
  );
}
