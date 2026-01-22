import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Container } from "@/components/Container.tsx";
import { PrismicNextImage } from "@prismicio/next";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import { Icon } from "@/components/Icon.tsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

export default function LogoCloudSimple({
  slice,
}: {
  slice: Content.LogoCloudSliceDefault;
}) {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section id={slice.primary.anchor || undefined}>
      <ThemeContainer theme={slice.primary.theme} className="py-16 lg:py-32">
        <Container className="text-center">
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
            <ul className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0">
              {themeColor === "dark" &&
                slice.primary.logos?.map((company, idx) => {
                  return company.logo.url?.includes(".svg") ? (
                    <li key={idx} className="flex">
                      <Icon
                        src={company.logo.url}
                        size="auto"
                        color="white"
                        className="h-12"
                        fallback={company.logo}
                      />
                    </li>
                  ) : (
                    <li key={idx} className="flex">
                      <PrismicNextImage
                        className="object-cover"
                        field={company.logo}
                        height={48}
                        imgixParams={{
                          monochrome: "FFFFFF",
                        }}
                      />
                    </li>
                  );
                })}
              {themeColor === "light" &&
                slice.primary.logos?.map((company, idx) => (
                  <li key={idx} className="flex">
                    <SuspenseImage
                      image={company.logo}
                      className="object-cover"
                      height={48}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </Container>
      </ThemeContainer>
    </section>
  );
}
