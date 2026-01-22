import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Container } from "@/components/Container.tsx";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import { Icon } from "@/components/Icon.tsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

export default function LogoCloudGrid({
  slice,
}: {
  slice: Content.LogoCloudSliceThreeColumns;
}) {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section id={slice.primary.anchor || undefined}>
      <ThemeContainer theme={slice.primary.theme}>
        <Container className="py-16 text-center lg:py-32">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              paragraph: ({ children }) => (
                <p
                  className={`font-display text-xl ${
                    themeColor === "dark" ? "text-white" : "text-darkGrey"
                  }`}
                >
                  {children}
                </p>
              ),
            }}
          />
          <div
            role="list"
            className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
          >
            <ul className="grid grid-cols-1 gap-y-8 overflow-hidden sm:mx-0 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-20 sm:gap-y-8">
              {themeColor === "dark" &&
                slice.primary.logos?.map((company, idx) => {
                  return company.logo.url?.includes(".svg") ? (
                    <li key={idx} className="object-cover">
                      <Icon
                        src={company.logo.url}
                        size="xxl"
                        color="white"
                        fallback={company.logo}
                      />
                    </li>
                  ) : (
                    <li key={idx} className="object-cover">
                      <PrismicNextImage
                        field={company.logo}
                        width={200}
                        imgixParams={{
                          monochrome: "FFFFFF",
                        }}
                      />
                    </li>
                  );
                })}
              {themeColor === "light" &&
                slice.primary.logos?.map((company, idx) => (
                  <li key={idx} className="object-cover">
                    <SuspenseImage image={company.logo} width={200} />
                  </li>
                ))}
            </ul>
          </div>
        </Container>
      </ThemeContainer>
    </section>
  );
}
