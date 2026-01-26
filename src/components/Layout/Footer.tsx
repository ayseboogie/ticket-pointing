import { Container } from "@/components/Container";
import { PrismicRichText } from "@prismicio/react";
import { createSerializerP } from "@/utils/createSerializer";
import { FooterDocumentData } from "../../../prismicio-types";
import * as React from "react";

type FooterProps = {
  footer: FooterDocumentData;
};

const Footer = ({ footer }: FooterProps) => {
  return (
    <footer className="bg-background">
      <Container>
        <div className="flex justify-center border-t border-slate-400/10 py-8">
          <PrismicRichText
            field={footer.copyright}
            components={{
              paragraph: createSerializerP("text-sm text-slate-500"),
            }}
          />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
