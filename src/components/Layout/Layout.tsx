import * as React from "react";
import type { FooterDocument } from "../../../prismicio-types";
import Footer from "./Footer.tsx";

type LayoutProps = {
  footer: FooterDocument;
  children: React.ReactNode;
};
const Layout = ({ footer, children }: LayoutProps) => {
  return (
    // flex flex-col keeps footer at bottom
    <div className="min-h-screen flex flex-col">
      <div id="top" />

      {/* flex grow keeps footer at bottom */}
      <main className="flex-grow">{children}</main>

      <Footer footer={footer.data} />
    </div>
  );
};

export default Layout;
