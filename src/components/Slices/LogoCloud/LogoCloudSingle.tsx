import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { UnderlineDoodle } from "@/components/UnderlineDoodle.tsx";
import { Container } from "@/components/Container.tsx";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import { Icon } from "@/components/Icon.tsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

export default function LogoCloudSingle({
  slice,
}: {
  slice: Content.LogoCloudSliceSingle;
}) {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section id={slice.primary.anchor || undefined}>
      <ThemeContainer theme={slice.primary.theme}>
        <Container className="py-16 text-center lg:py-32">
          <div
            className={`font-display text-3xl ${
              themeColor === "dark" ? "text-white" : "text-darkGrey"
            }`}
          >
            <span className="relative whitespace-nowrap">
              <UnderlineDoodle className="absolute left-0 top-1/2 h-[1em] w-full fill-light-blue-70" />
              <PrismicRichText
                field={slice.primary.title}
                components={{
                  paragraph: ({ children }) => (
                    <span className="relative">{children}</span>
                  ),
                }}
              />
            </span>
          </div>
          <div className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0">
            <div className="grid grid-cols-1 gap-y-8 items-center overflow-hidden sm:mx-0 md:grid-cols-1 sm:gap-x-20 sm:gap-y-8">
              {themeColor === "dark" &&
                (slice.primary.logo.url?.includes(".svg") ? (
                  <Icon
                    src={slice.primary.logo.url}
                    color="white"
                    size="xl"
                    fallback={slice.primary.logo}
                  />
                ) : (
                  <PrismicNextImage
                    field={slice.primary.logo}
                    width={320}
                    imgixParams={{
                      monochrome: "FFFFFF",
                    }}
                  />
                ))}
              {themeColor === "light" && (
                <SuspenseImage image={slice.primary.logo} width={320} />
              )}
            </div>
          </div>
        </Container>
      </ThemeContainer>
    </section>
  );
}
