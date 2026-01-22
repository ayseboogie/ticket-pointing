import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { createClient } from "@/prismicio.tsx";
import { components } from "@/slices";
import process from "node:process";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("page", "home").catch(() => notFound());

  const siteurl = process.env.SITE_URL;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "";

  return {
    title: `${page.data.meta_title} | ${siteName}`,
    authors: [{ name: page.data.meta_author ?? "" }],
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      url: page.data.meta_url ?? siteurl,
      description: page.data.meta_description ?? "",
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
    twitter: {
      card: "summary_large_image",
      images: [{ url: page.data.meta_image.url ?? "" }],
      // site: page.data.twitter_handle ?? "",
    },
    alternates: {
      canonical: page.data.meta_url ?? siteurl,
    },
    icons: {
      icon: page.data.meta_image.url ?? undefined,
    },
  };
}

// this gets the home page
export default async function Page() {
  const client = createClient();
  const page = await client.getByUID("page", "home").catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}
