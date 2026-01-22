"use client";

import type { Content } from "@prismicio/client";
import { Container } from "@/components/Container.tsx";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { Disclosure } from "@headlessui/react";
import React from "react";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

type FaqCenteredProps = {
  slice: Content.FaqSliceCentered;
};

const FaqCentered = ({ slice }: FaqCenteredProps) => {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section id={slice.primary.anchor || undefined} aria-labelledby="faq-title">
      <ThemeContainer
        theme={slice.primary.theme}
        className="relative overflow-hidden py-20 sm:py-32"
      >
        <Container className="relative">
          <div className="mx-auto max-w-4xl divide-y divide-white-900/10">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2
                    id="faq-title"
                    className={`text-3xl font-display leading-10 tracking-tight ${
                      themeColor === "dark" ? "text-white" : "text-darkGrey"
                    }`}
                  >
                    {children}
                  </h2>
                ),
              }}
            />
            <dl className="mt-10 space-y-6 divide-y divide-white-900/10">
              {slice.primary.faq?.map((faq, idx) => (
                <Disclosure as="div" key={idx} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left ">
                          <span
                            className={`text-base font-semibold leading-7 ${
                              themeColor === "dark"
                                ? "text-white"
                                : "text-darkGrey"
                            }`}
                          >
                            <PrismicRichText
                              field={faq.question}
                              components={{
                                paragraph: ({ children }) => <p>{children}</p>,
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
                          </span>
                          <span
                            className={`ml-6 flex h-7 items-center ${
                              themeColor === "dark"
                                ? "text-white"
                                : "text-darkGrey"
                            }`}
                          >
                            {open ? (
                              <FontAwesomeIcon
                                className="h-6 w-6"
                                icon={faMinus}
                              />
                            ) : (
                              <FontAwesomeIcon
                                className="h-6 w-6"
                                icon={faPlus}
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <PrismicRichText
                          field={faq.answer}
                          components={{
                            paragraph: ({ children }) => (
                              <p
                                className={`text-base leading-7 ${
                                  themeColor === "dark"
                                    ? "text-light-gray"
                                    : "text-light-black"
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
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </Container>
      </ThemeContainer>
    </section>
  );
};

export default FaqCentered;
