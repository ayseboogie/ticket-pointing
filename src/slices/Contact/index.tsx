"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ContactCmp from "@/components/Slices/Contact/ContactCmp";

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const Contact = ({ slice }: ContactProps) => {
  return <ContactCmp slice={slice} />;
};

export default Contact;
