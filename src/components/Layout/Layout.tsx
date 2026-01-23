import * as React from "react";
import type {
  FooterDocument,
  LayoutconstantsDocument,
  NavigationDocument,
} from "../../../prismicio-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./Navigation/NavBar.tsx";
import { Suspense } from "react";
import Footer from "./Footer.tsx";

type LayoutProps = {
  navigation: NavigationDocument;
  layoutConstants: LayoutconstantsDocument;
  footer: FooterDocument;
  children: React.ReactNode;
};
const Layout = ({
  navigation,
  layoutConstants,
  footer,
  children,
}: LayoutProps) => {
  return (
    // flex flex-col keeps footer at bottom
    <div className="min-h-screen flex flex-col">
      <div id="top" />

      {/*<Suspense>*/}
      <NavBar navigation={navigation} layoutConstants={layoutConstants} />
      {/*</Suspense>*/}

      {/* flex grow keeps footer at bottom */}
      <main className="flex-grow">{children}</main>

      <Footer footer={footer.data} />
    </div>
  );
};

export default Layout;
