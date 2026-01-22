"use client";

import { Button } from "@/components/Button.tsx";
import type { Content } from "@prismicio/client";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import { handleSubmitNewsletter } from "@/utils/formHandler.tsx";
import EmailInput from "@/components/EmailInput/EmailInput.tsx";

export default function Form(slice: Content.FormSliceCentered) {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section id={slice.primary.anchor || undefined}>
      <ThemeContainer
        theme={slice.primary.theme}
        className="relative isolate overflow-hidden px-6 py-24 sm:px-24 xl:py-32"
      >
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading2: ({ children }) => (
              <h2
                className={`mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl ${
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
                className={`mx-auto mt-2 max-w-xl text-center text-lg leading-8 ${
                  themeColor === "dark" ? "text-light-gray" : "text-darkGrey"
                }`}
              >
                {children}
              </p>
            ),
          }}
        />
        <form
          onSubmit={handleSubmitNewsletter}
          className="mx-auto mt-10 flex max-w-md gap-x-4"
        >
          <EmailInput
            id="email"
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            labelSrOnly
            placeholder={
              slice.primary.placeholder ? slice.primary.placeholder : undefined
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
        </form>
        <PrismicRichText
          field={slice.primary.disclaimer}
          components={{
            paragraph: ({ children }) => (
              <p
                className={`mx-auto mt-4 max-w-xl text-center text-sm leading-6 ${
                  themeColor === "dark" ? "text-light-gray" : "text-darkGrey"
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
      </ThemeContainer>
    </section>
  );
}
