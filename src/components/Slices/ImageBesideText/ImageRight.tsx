"use client";

import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";
import * as React from "react";
import { useAtom } from "jotai/index";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { HeadingWrapper } from "@/components/HeadingWrapper.tsx";
import Bounded from "@/components/Bounded.tsx";
import { emailInputGetStarted } from "@/jotai/EmailInput.ts";
import { router } from "next/client";
import EmailInput from "@/components/EmailInput/EmailInput.tsx";
import { Content, isFilled } from "@prismicio/client";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

type ImageRightProps = {
  slice: Content.ImageBesideTextSlice;
};

// Regular expression for email validation
const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

const ImageRight = ({ slice }: ImageRightProps) => {
  const [, setEmailAddressAtom] = useAtom(emailInputGetStarted);
  // validity state
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Event handler for input change, using the debounced function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debouncedSetEmailAddressAtom(value);
  };

  // Define a debounced version of the setEmailAddressAtom function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetEmailAddressAtom = useCallback(
    debounce((email) => {
      setEmailAddressAtom(email);
      setIsEmailValid(emailRegex.test(email));
    }, 250),
    [], // Empty dependency array to ensure the function is only created once
  );

  const handleButtonClick = () => {
    if (isEmailValid) {
      // Proceed with button action
      // Example: navigate to a new page or submit a form
      router.replace("/Contact");
    } else {
      // Handle invalid email address
      alert("Please enter a valid email address.");
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded size="widest">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {/* 60% width */}
          <div className="w-full md:w-3/5 flex items-center justify-center pb-4 md:pb-0 pr-4">
            <div style={{ paddingLeft: "2rem" }}>
              {/* title */}
              <HeadingWrapper size="5xl" className="pb-2">
                <PrismicText field={slice.primary.title} />
              </HeadingWrapper>
              {/* subtitle */}
              {isFilled.keyText(slice.primary.subtitle) && (
                <div className="text-lg font-medium">
                  {slice.primary.subtitle}
                </div>
              )}
              {/* body text */}
              <div className="leading-relaxed md:text-lg md:leading-relaxed">
                <PrismicRichText field={slice.primary.description} />
              </div>
              {/*  input */}
              <div className="flex flex-row pt-4">
                <div className="flex-75">
                  <EmailInput
                    id="email"
                    label="Email address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    labelSrOnly
                    placeholder="Email Address"
                    buttonConnected
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-25">
                  <PrismicLink field={slice.primary.link}>
                    <button
                      type="button"
                      className="btn-primary rounded-l-none"
                      onClick={handleButtonClick}
                      disabled={!isEmailValid}
                    >
                      {slice.primary.link.text || "Get Started"}
                    </button>
                  </PrismicLink>
                </div>
              </div>
            </div>
          </div>

          {/* 40% width */}
          <div className="w-full md:w-2/5 pb-2 mobile-order-1">
            <div
              className="aspect-video"
              style={{ maxHeight: "4000px", maxWidth: "6000px" }}
            >
              <SuspenseImage
                image={slice.primary.image}
                className="object-cover max-w-full"
              />
            </div>
          </div>
        </div>
      </Bounded>

      <style>
        {/*Moves the element to the beginning of the flex container */}
        {`
          @media (max-width: 768px) {
           .mobile-order-1 {
              order: -1;
            }
          }
        `}
      </style>
    </section>
  );
};

export default ImageRight;
