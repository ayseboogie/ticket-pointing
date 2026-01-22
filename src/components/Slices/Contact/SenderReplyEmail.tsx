import * as React from "react";
import {
  Html,
  Heading,
  Hr,
  Markdown,
  Text,
  Container,
  Section,
  Img,
  Link,
  Tailwind,
} from "@react-email/components";
import * as process from "node:process";

export type EmailProps = {
  message: string;
  name?: string;
  email?: string;
};

const SenderReplyEmail = ({ message }: EmailProps) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              textMain: "#000000",
              textSecondary: "#4F4A45",
              accent: "#A4B0A0",
              highlight: "#B2945A",
              darkGrey: "#0F172A",
            },
          },
        },
      }}
    >
      <Html lang="en">
        <Container>
          <Heading className="text-center text-[#0F172A]">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </Heading>
          <Heading as="h3" className="text-center text-[#4F4A45]">
            Copy of Your Message
          </Heading>
          <Hr className="my-[16px] border-t-2" />

          <Container>
            <Markdown>{message}</Markdown>
          </Container>

          <Text className="text-md font-semibold mx-[0]">
            Thank you for getting in contact with me
          </Text>
          <Text className="font-semibold mx-[0]">Best,</Text>
          <Text className="font-semibold mx-[0]">Ayse Stinnett</Text>

          <Hr className="my-[16px] border-t-2" />

          <Section className="text-center">
            <table className="w-full">
              <tbody>
                <tr className="w-full">
                  <td align="center">
                    <Img
                      alt="React Email logo"
                      height="42"
                      src="https://react.email/static/logo-without-background.png"
                    />
                  </td>
                </tr>
                <tr className="w-full">
                  <td align="center">
                    <Link
                      href={process.env.SITE_URL}
                      className="my-[8px] text-[16px] font-semibold leading-[24px] text-[#0F172A]"
                    >
                      {process.env.NEXT_PUBLIC_SITE_NAME}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <Text className="mb-0 mt-[4px] text-[16px] font-semibold leading-[24px] text-[#0F172A]">
                      {process.env.NEXT_PUBLIC_MY_EMAIL}
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>
        </Container>
      </Html>
    </Tailwind>
  );
};

export default SenderReplyEmail;
