import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";
import { KeyTextField } from "@prismicio/types";
import Link, { LinkProps } from "next/link";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */

const routes: prismic.ClientConfig["routes"] = [
  { type: "page", path: "/", uid: "home" },
  {
    type: "page",
    path: "/:uid",
  },
  //   example of more routes
  //   {
  //     type: "blog_article",
  //     resolvers: {
  //       category: "category",
  //     },
  //     path: "/:lang/blog/:category?/:uid",
  //   },
  //   {
  //     type: "landing_page",
  //     path: "/:lang/lp/:uid",
  //   },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};

interface AnchorLinkProps extends LinkProps {
  anchor?: KeyTextField;
}

export const AnchorLink = ({ ...props }: AnchorLinkProps) => {
  const resolvedHref = props.href + (props.anchor ? `#${props.anchor}` : "");

  return <Link {...props} href={resolvedHref} />;
};
