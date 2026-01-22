"use client";

import type { Content } from "@prismicio/client";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import cn from "classnames";
import { SwirlyDoodle } from "@/components/SwirlyDoodle.tsx";
import Plan from "./Plan.tsx";
import { useState } from "react";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";

const PricingWithFilters = ({
  slice,
}: {
  slice: Content.PricingSliceWithFilter;
}) => {
  const [isYearlyPricing, setIsYearlyPricing] = useState(false);

  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section id={slice.primary.anchor || undefined} aria-label="Pricing">
      <div className="relative overflow-hidden">
        <ThemeContainer theme={slice.primary.theme}>
          <div className="w-full flex flex-col">
            <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
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
                        <span className="relative whitespace-nowrap">
                          <SwirlyDoodle className="absolute left-0 top-1/2 h-[1em] w-full fill-blue-400" />
                          <span className="relative">{children}</span>
                        </span>
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
                      className={`mt-4 text-lg ${
                        themeColor === "dark"
                          ? "text-white"
                          : "text-light-black"
                      }`}
                    >
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          </div>
        </ThemeContainer>
        <div className="flow-root bg-white pb-24 sm:pb-32">
          <div className="-mt-80">
            <div className="w-full flex justify-center gap-6 mb-6">
              <button
                type="button"
                className={cn(
                  "transition-opacity z-10",
                  isYearlyPricing && "opacity-50",
                  themeColor === "dark" ? "text-white" : "text-light-black",
                )}
                onClick={() => setIsYearlyPricing(false)}
              >
                {slice.primary.monthly_label}
              </button>
              <button
                type="button"
                className="h-10 w-20 rounded-full bg-white p-1 z-10"
                onClick={() => setIsYearlyPricing(!isYearlyPricing)}
              >
                <span
                  className={cn(
                    "block h-8 w-8 rounded-full bg-light-blue transition-transform duration-150",
                    isYearlyPricing && "translate-x-10 transform",
                  )}
                />
                <span className="sr-only">Toggle monthly/yearly pricing</span>
              </button>
              <button
                type="button"
                className={cn(
                  "transition-opacity z-10",
                  !isYearlyPricing && "opacity-50",
                  themeColor === "dark" ? "text-white" : "text-light-black",
                )}
                onClick={() => setIsYearlyPricing(true)}
              >
                {slice.primary.yearly_label}
              </button>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div
                className={cn(
                  "mx-auto grid max-w-md grid-cols-1 gap-8",
                  slice.primary.plans?.length === 1
                    ? "lg:max-w-4xl lg:grid-cols-1 lg:justify-items-center"
                    : slice.primary.plans?.length === 3
                      ? "lg:max-w-5xl lg:grid-cols-3"
                      : "lg:max-w-4xl lg:grid-cols-2",
                )}
              >
                {slice.primary.plans?.map((plan, index) => (
                  <Plan
                    key={"plan" + plan.name + index}
                    name={plan.name}
                    price={
                      isYearlyPricing ? plan.price_yearly : plan.price_monthly
                    }
                    description={plan.description}
                    link={plan.register_link}
                    features={plan.features}
                    lightTheme
                  />
                ))}
                <div
                  className={cn(
                    "flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 bg-white ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:flex-row lg:items-center",
                    slice.primary.plans?.length === 3
                      ? "lg:col-span-3"
                      : "lg:col-span-2 ",
                  )}
                >
                  <div className="lg:min-w-0 lg:flex-1">
                    <PrismicRichText
                      field={slice.primary.promo_title}
                      components={{
                        heading3: ({ children }) => (
                          <h3 className="text-lg font-semibold leading-8 tracking-tight text-vibrant-blue">
                            {children}
                          </h3>
                        ),
                      }}
                    />
                    <PrismicRichText
                      field={slice.primary.promo_description}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="mt-1 text-base leading-7 text-gray-600">
                            {children}
                          </p>
                        ),
                      }}
                    />
                  </div>
                  <PrismicLink
                    field={slice.primary.promo_link}
                    className="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-vibrant-blue ring-1 ring-inset ring-light-blue hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibrant-blue"
                  >
                    {slice.primary.promo_link_label}

                    <span aria-hidden="true">&rarr;</span>
                  </PrismicLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingWithFilters;
