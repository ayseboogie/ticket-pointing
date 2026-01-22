"use client";

import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Container } from "@/components/Container.tsx";
import { asText } from "@prismicio/client";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

export default function FeaturesHorizontal({
  slice,
  rightSide = false,
}: {
  slice: Content.FeaturesSliceLeftSide | Content.FeaturesSliceRightSide;
  rightSide: boolean;
}) {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);
  return (
    <section
      id={slice.primary.anchor || undefined}
      aria-label="Features for running your books"
    >
      <ThemeContainer
        theme={slice.primary.theme}
        className="relative overflow-hidden pb-28 pt-20 sm:py-32"
      >
        <Container className="relative">
          <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2
                    className={`font-display text-3xl tracking-tight sm:text-4xl md:text-5xl ${
                      themeColor === "dark" ? "text-white" : "text-darkGrey"
                    }`}
                  >
                    {children}
                  </h2>
                ),
              }}
            />
            <PrismicRichText
              field={slice.primary.subtitle}
              components={{
                paragraph: ({ children }) => (
                  <p
                    className={`mt-6 text-lg tracking-tight text-blue-100 ${
                      themeColor === "dark"
                        ? "text-blue-100"
                        : "text-light-black"
                    }`}
                  >
                    {children}
                  </p>
                ),
              }}
            />
          </div>
          <Tab.Group
            as="div"
            className={`grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0 ${
              rightSide === true ? "mt-16 " : ""
            }`}
            vertical={tabOrientation === "vertical"}
          >
            {({ selectedIndex }) => (
              <>
                <div
                  className={`-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5 ${
                    rightSide === true ? "order-1" : "order-2"
                  }`}
                >
                  <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                    {slice.primary.features?.map((feature, featureIndex) => (
                      <div
                        key={asText(feature.feature_title)}
                        className={clsx(
                          `group relative rounded-full px-4 py-1 ${
                            rightSide === true
                              ? "lg:rounded-l-xl lg:rounded-r-none"
                              : "lg:rounded-l-none lg:rounded-r-xl"
                          } lg:p-6`,
                          themeColor === "dark" &&
                            selectedIndex === featureIndex
                            ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10"
                            : themeColor === "dark" &&
                                selectedIndex !== featureIndex
                              ? "hover:bg-white/10 lg:hover:bg-white/5"
                              : themeColor === "light" &&
                                  selectedIndex === featureIndex
                                ? "lg:bg-light-blue/10 lg:ring-1 lg:ring-inset lg:ring-light-blue-70/10"
                                : "hover:bg-light-blue-70 lg:hover:bg-light-blue/5",
                        )}
                      >
                        <h3>
                          <Tab
                            className={clsx(
                              "font-display text-lg text-left focus-visible:outline-0",
                              themeColor === "dark" &&
                                selectedIndex === featureIndex
                                ? "text-blue-600 lg:text-white"
                                : themeColor === "dark" &&
                                    selectedIndex !== featureIndex
                                  ? "text-blue-100 hover:text-white lg:text-white"
                                  : themeColor === "light" &&
                                      selectedIndex === featureIndex
                                    ? "text-darkGrey"
                                    : "text-light-black hover:text-darkGrey",
                            )}
                          >
                            <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                            <PrismicRichText field={feature.feature_title} />
                          </Tab>
                        </h3>
                        <PrismicRichText
                          field={feature.feature_description}
                          components={{
                            paragraph: ({ children }) => (
                              <p
                                className={clsx(
                                  "mt-2 hidden text-sm lg:block",
                                  themeColor === "dark" &&
                                    selectedIndex === featureIndex
                                    ? "text-white"
                                    : themeColor === "dark" &&
                                        selectedIndex !== featureIndex
                                      ? "text-blue-100 group-hover:text-white"
                                      : themeColor === "light" &&
                                          selectedIndex === featureIndex
                                        ? "text-darkGrey"
                                        : "text-light-black hover:text-darkGrey",
                                )}
                              >
                                {children}
                              </p>
                            ),
                          }}
                        />
                      </div>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels
                  className={`lg:col-span-7 ${
                    rightSide === true ? "order-2" : "order-1 justify-self-end"
                  }`}
                >
                  {slice.primary.features?.map((feature) => (
                    <Tab.Panel
                      key={asText(feature.feature_title)}
                      unmount={false}
                    >
                      {rightSide === true && (
                        <div className="relative sm:px-6 lg:hidden">
                          <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                          <PrismicRichText
                            field={feature.feature_description}
                            components={{
                              paragraph: ({ children }) => (
                                <p
                                  className={`relative mx-auto max-w-2xl text-base ${
                                    themeColor === "dark"
                                      ? "text-white"
                                      : "text-darkGrey"
                                  } sm:text-center`}
                                >
                                  {children}
                                </p>
                              ),
                            }}
                          />
                        </div>
                      )}
                      <div
                        className={`w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]  ${
                          rightSide === true ? "mt-10" : ""
                        }`}
                      >
                        <SuspenseImage
                          className="w-full"
                          image={feature.feature_screenshot}
                          priority
                          sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                        />
                      </div>
                      {rightSide !== true && (
                        <div className="relative sm:px-6 lg:hidden mt-16">
                          <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                          <div className="ml-auto w-[92vw]">
                            <PrismicRichText
                              field={feature.feature_description}
                              components={{
                                paragraph: ({ children }) => (
                                  <p
                                    className={`relative max-w-2xl text-base ${
                                      themeColor === "dark"
                                        ? "text-white"
                                        : "text-darkGrey"
                                    } sm:text-center`}
                                  >
                                    {children}
                                  </p>
                                ),
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </>
            )}
          </Tab.Group>
        </Container>
      </ThemeContainer>
    </section>
  );
}
