import type { Content } from "@prismicio/client";
import { Button } from "@/components/Button.tsx";
import { Container } from "@/components/Container.tsx";
import { PrismicRichText } from "@prismicio/react";
import { UnderlineDoodle } from "@/components/UnderlineDoodle.tsx";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";

type CtaSimpleProps = {
  slice: Content.CallToActionSliceDefault;
  withBackground: boolean;
};

export default function CtaSimple({
  slice,
  withBackground = true,
}: CtaSimpleProps) {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section id={slice.primary.anchor || undefined}>
      <ThemeContainer
        theme={slice.primary.theme}
        className={`relative overflow-hidden ${
          withBackground && "bg-blue-600"
        } py-32`}
      >
        <Container className="relative">
          <div className="mx-auto max-w-lg text-center">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2
                    className={`font-display text-3xl tracking-tight ${
                      themeColor === "dark" ? "text-white" : "text-darkGrey"
                    } sm:text-4xl`}
                  >
                    {children}
                  </h2>
                ),
                strong: ({ children }) => {
                  return (
                    <>
                      {themeColor === "light" ? (
                        <span className="relative whitespace-nowrap text-blue-600">
                          <UnderlineDoodle className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70" />
                          <span className="relative">{children}</span>
                        </span>
                      ) : (
                        <span className="relative whitespace-nowrap">
                          <UnderlineDoodle className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70" />
                          <span className="relative">{children}</span>
                        </span>
                      )}
                    </>
                  );
                },
              }}
            />
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p
                    className={`mt-4 text-lg tracking-tight ${
                      themeColor === "dark" ? "text-white" : "text-darkGrey"
                    }`}
                  >
                    {children}
                  </p>
                ),
              }}
            />

            <Button
              field={slice.primary.cta_link}
              color={themeColor === "dark" ? "white" : "slate"}
              className="mt-10"
            >
              {slice.primary.cta_label}
            </Button>
          </div>
        </Container>
      </ThemeContainer>
    </section>
  );
}
