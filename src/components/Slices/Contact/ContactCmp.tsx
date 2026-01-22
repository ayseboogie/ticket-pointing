"use client";
import * as prismic from "@prismicio/client";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { emailInputGetStarted } from "@/jotai/EmailInput.ts";
import TextAreaField from "@/components/Slices/Contact/InputFields/TextAreaField.tsx";

import { HeadingWrapper } from "@/components/HeadingWrapper.tsx";
import InputField from "@/components/Slices/Contact/InputFields/InputField.tsx";
import LoadingSpinner from "@/components/LoadingSpinner.tsx";
import useRecaptcha from "./useRecaptcha";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { ThemeContainer } from "@/components/ComponentTheme/Theme.tsx";

type ContactCmpProps = {
  slice: Content.ContactSlice;
};

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const ContactCmp = ({ slice }: ContactCmpProps) => {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  // for home button
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  // jotai state coming from get started input on homepage
  const [emailAddressAtom, setEmailAddressAtom] = useAtom(emailInputGetStarted);
  // local email value state
  const [emailValue, setEmailValue] = useState(emailAddressAtom ?? "");
  // ensuring email value is updated on load if atom != null
  useEffect(() => {
    emailAddressAtom && setEmailValue(emailAddressAtom);
  }, [emailAddressAtom]);

  // Event handler for input change, using the debounced function
  const handleInputChange = (newValue: string) => {
    // Update the value in the parent component
    setEmailValue(newValue);
  };

  // has form been submitted state
  const [send, setSend] = useState(false);

  // recaptcha
  const { captchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  async function handleSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    // Check if the reCAPTCHA validation failed on the server-side
    if (!captchaToken) {
      handleRecaptcha("");
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      return;
    }

    const data = {
      email: event.target.email.value,
      name: event.target.name.value,
      message: event.target.message.value,
      token: captchaToken,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/contact-form";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    try {
      // Make the POST request to contact form API
      const response = await fetch(endpoint, options);

      // After form submission, reset captcha token, nullify email jotai, & set send to true
      setSend(true);
      setEmailAddressAtom(null);
    } catch (error) {
      alert("There was an issue sending your message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  let content;

  if (send) {
    content = (
      <Bounded id="contact-slice" size="wide">
        <div
          className={`text-center tracking-wide text-base md:text-lg ${themeColor === "dark" ? "text-white" : "text-darkGrey"}`}
        >
          <PrismicRichText field={slice.primary.post_message_send_message} />
        </div>
        <div className="flex justify-center items-end h-36 tracking-wide text-base md:text-lg">
          <button onClick={() => router.replace("/")} className="btn-primary">
            Home
          </button>
        </div>
      </Bounded>
    );
  } else {
    content = (
      <Bounded size="small">
        {prismic.isFilled.richText(slice.primary.title) && (
          <HeadingWrapper
            className={`text-center tracking-wide ${themeColor === "dark" ? "text-white" : "text-darkGrey"}`}
          >
            <PrismicText field={slice.primary.title} />
          </HeadingWrapper>
        )}

        {prismic.isFilled.richText(slice.primary.subtitle) && (
          <HeadingWrapper
            size="xl"
            className={`text-center tracking-wide ${themeColor === "dark" ? "text-white" : "text-darkGrey"}`}
          >
            <PrismicText field={slice.primary.subtitle} />
          </HeadingWrapper>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <InputField
              label="Name*"
              name="name"
              className={`${themeColor === "dark" ? "text-white" : "text-darkGrey"}`}
            />
            <InputField
              label="Email Address*"
              name="email"
              type="email"
              value={emailValue}
              onChange={handleInputChange}
              className={`${themeColor === "dark" ? "text-white" : "text-darkGrey"}`}
            />
            <TextAreaField
              label="Message*"
              name="message"
              placeholder="Write your message here…"
              className={`${themeColor === "dark" ? "text-white" : "text-darkGrey"}`}
            />
            <div className="flex justify-center py-4">
              {recaptchaSiteKey && (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaSiteKey}
                  onChange={handleRecaptcha}
                />
              )}
            </div>
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={captchaToken === "" || isLoading}
                className="btn-primary w-1/2"
              >
                Send message{" "}
                <span aria-hidden={true} className="text-xl">
                  &rarr;
                </span>
              </button>
            </div>
          </form>
        )}
      </Bounded>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ThemeContainer
        theme={slice.primary.theme}
        className="relative overflow-hidden py-15 md:py-10"
      >
        {content}
      </ThemeContainer>
    </section>
  );
};

export default ContactCmp;
