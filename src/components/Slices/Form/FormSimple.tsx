"use client";

import { Button } from "@/components/Button.tsx";
import type { Content } from "@prismicio/client";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { EmailInput } from "@/components/EmailInput/EmailInput.tsx";
import { handleSubmitNewsletter } from "@/utils/formHandler.tsx";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import {
  createSerializerH2,
  createSerializerP,
} from "@/utils/createSerializer.tsx";

export default function Form(slice: Content.FormSliceSimple) {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section id={slice.primary.anchor || undefined}>
      <ThemeContainer
        theme={slice.primary.theme}
        className="py-16 sm:py-24 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 items-center">
          <div
            className={`max-w-2xl text-3xl font-display tracking-tight text-gray-900 sm:text-4xl lg:col-span-7 ${
              themeColor === "dark" ? "text-white" : "text-darkGrey"
            }`}
          >
            <PrismicRichText
              field={slice.primary.description}
              components={{
                heading2: createSerializerH2(
                  "inline sm:block lg:inline xl:block",
                ),
                paragraph: createSerializerP(
                  "inline sm:block lg:inline xl:block",
                ),
              }}
            />
          </div>
          <form
            onSubmit={handleSubmitNewsletter}
            className="w-full max-w-md lg:col-span-5 lg:pt-2"
          >
            <div className="flex gap-x-4">
              <EmailInput
                id="email"
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                required
                labelSrOnly
                placeholder={
                  slice.primary.placeholder
                    ? slice.primary.placeholder
                    : undefined
                }
                className="flex-auto"
              />
              <Button
                variant="solid"
                color={`${themeColor === "dark" ? "white" : "blue"}`}
                submit
              >
                {slice.primary.subscribe_label}
              </Button>
            </div>
            <PrismicRichText
              field={slice.primary.disclaimer}
              components={{
                paragraph: ({ children }) => (
                  <p
                    className={`mt-4 text-sm leading-6 ${
                      themeColor === "dark"
                        ? "text-light-gray"
                        : "text-darkGrey"
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
          </form>
        </div>
      </ThemeContainer>
    </section>
  );
}
