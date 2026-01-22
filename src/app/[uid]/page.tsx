import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { components } from "@/slices";
import { createClient } from "@/prismicio.tsx";
import { filter } from "@prismicio/client";

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

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

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();

  // Get all pages from Prismic, except the homepage.
  const pages = await client.getAllByType("page", {
    filters: [filter.not("my.page.uid", "home")],
  });

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
