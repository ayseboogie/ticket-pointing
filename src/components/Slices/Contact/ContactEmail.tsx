import * as React from "react";
import {
  Html,
  Heading,
  Hr,
  Text,
  Container,
  Row,
  Column,
  Markdown,
  Tailwind,
  Section,
} from "@react-email/components";
import process from "node:process";
import { EmailProps } from "@/components/Slices/Contact/SenderReplyEmail.tsx";

const ContactEmail = ({ message, name, email }: EmailProps) => {
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
          <Heading as="h1" className="text-center text-darkGrey">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </Heading>
          <Heading as="h3" className="text-center text-textSecondary">
            Contact Form Submission
          </Heading>
          <Hr className="my-[16px] border-t-2 border-darkGrey" />
        </Container>

        <Container>
          <Row>
            <Column>
              <Heading as="h4">From:</Heading>
            </Column>
            <Column>
              <Text className="font-semibold">
                {name} - {email}
              </Text>
            </Column>
          </Row>
          <Hr className="my-[16px] border-darkGrey border-5" />
          <Row>
            <Column>
              <Heading as="h4">Message:</Heading>
            </Column>
            <Column>
              <Section className="ml-[10px]">
                <Markdown>{message}</Markdown>
              </Section>
            </Column>
          </Row>

          <Hr className="my-[16px] border-t-2 border-darkGrey" />
        </Container>
      </Html>
    </Tailwind>
  );
};

export default ContactEmail;
