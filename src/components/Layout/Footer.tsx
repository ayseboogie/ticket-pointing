import { Container } from "@/components/Container";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { createSerializerP } from "@/utils/createSerializer";
import { FooterDocumentData } from "../../../prismicio-types";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";
import * as React from "react";
import { Icon } from "@/components/Icon.tsx";

type FooterProps = {
  footer: FooterDocumentData;
};

const Footer = ({ footer }: FooterProps) => {
  return (
    <footer className="bg-background">
      <Container>
        <div className="py-16">
          <SuspenseImage image={footer.logo} className="mx-auto h-10 w-auto" />
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              {footer?.links &&
                footer?.links.map((link, index) => (
                  <PrismicLink field={link.link} key={index}>
                    <PrismicRichText field={link.label} />
                  </PrismicLink>
                ))}
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-4">
            {footer.social_links &&
              footer?.social_links.map((socialLink, index) => (
                <PrismicLink
                  field={socialLink.link}
                  key={index}
                  className="group"
                >
                  <Icon
                    src={socialLink.icon.url ?? ""}
                    color="dark"
                    size="sm"
                    fallback={socialLink.icon}
                    className="h-6 w-6 group-hover:fill-highlight"
                  />
                </PrismicLink>
              ))}
          </div>
          <PrismicRichText
            field={footer.copyright}
            components={{
              paragraph: createSerializerP(
                "mt-6 text-sm text-slate-500 sm:mt-0",
              ),
            }}
          />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
