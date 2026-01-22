// These styles apply to every route in the application
import "./globals.css";

import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio.tsx";
import Layout from "@/components/Layout/Layout";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ReactNode } from "react";

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const client = createClient();
  const navigation = await client.getSingle("navigation");
  const layoutConstants = await client.getSingle("layoutconstants");
  const footer = await client.getSingle("footer");

  return (
    <html lang="en">
      <body>
        {/* google analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', ${process.env.NEXT_PUBLIC_GA_ID});`,
          }}
        />

        {/* prismic repo preview */}
        <Script
          async
          defer
          src="https://static.cdn.prismic.io/prismic.js?new=true&repo=slice-boilerplate"
        />

        {/* google recaptcha */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        />

        <Layout
        // navigation={navigation}
        // layoutConstants={layoutConstants}
        // footer={footer}
        >
          {children}
          {/* vercel speed insights */}
          <SpeedInsights />
          <PrismicPreview repositoryName={repositoryName} />
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
