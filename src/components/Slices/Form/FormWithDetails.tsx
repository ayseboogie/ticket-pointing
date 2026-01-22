import { Button } from "@/components/Button.tsx";
import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { handleSubmitNewsletter } from "@/utils/formHandler.tsx";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import EmailInput from "@/components/EmailInput/EmailInput.tsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage";

export default function Form(slice: Content.FormSliceWithDetails) {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <div id={slice.primary.anchor || undefined}>
      <ThemeContainer
        theme={slice.primary.theme}
        className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg font-display">
              <PrismicRichText
                field={slice.primary.title}
                components={{
                  heading2: ({ children }) => (
                    <h2
                      className={`text-3xl sm:text-4xl tracking-tight ${
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
                      className={`mt-4 text-lg leading-8 ${
                        themeColor === "dark"
                          ? "text-light-gray"
                          : "text-darkGrey"
                      }`}
                    >
                      {children}
                    </p>
                  ),
                }}
              />
              <form
                onSubmit={handleSubmitNewsletter}
                className="mt-6 flex max-w-md gap-x-4"
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
              </form>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              {slice.primary.content?.map((item, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <SuspenseImage
                      image={item.icon}
                      className={`h-6 w-6 fill-none aria-hidden ${
                        themeColor === "dark" ? "text-white" : "text-darkGrey"
                      }`}
                      sizes="52.75rem"
                    />
                  </div>
                  <PrismicRichText
                    field={item.title}
                    components={{
                      paragraph: ({ children }) => (
                        <dt
                          className={`mt-4 font-semibold ${
                            themeColor === "dark"
                              ? "text-white"
                              : "text-darkGrey"
                          }`}
                        >
                          {children}
                        </dt>
                      ),
                    }}
                  />
                  <PrismicRichText
                    field={item.description}
                    components={{
                      paragraph: ({ children }) => (
                        <dd
                          className={`mt-2 leading-7 ${
                            themeColor === "dark"
                              ? "text-light-gray"
                              : "text-darkGrey"
                          }`}
                        >
                          {children}
                        </dd>
                      ),
                    }}
                  />
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ThemeContainer>
    </div>
  );
}
