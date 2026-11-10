import type { Metadata } from "next";
import { site } from "@/content/site";
import { isLive } from "./env";

/** True only on the live domain. Previews, local builds and the vercel.app production URL stay out of search. */
export const isProduction = isLive;

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Set for the home page so the template suffix is not added twice. */
  absoluteTitle?: boolean;
  /** Keep a page out of search results, for example a placeholder profile. */
  noindex?: boolean;
};

export function pageMetadata({ title, description, path, absoluteTitle, noindex }: PageMeta): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
