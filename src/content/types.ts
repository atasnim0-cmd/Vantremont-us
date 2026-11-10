import type { PhotoKey } from "./photos";

export type PracticeId = "advisory" | "audit-and-assurance" | "tax";

export type Practice = {
  id: PracticeId;
  name: string;
  path: string;
  summary: string;
  metaDescription: string;
  hero: { title: string; intro: string[]; photo: PhotoKey };
  /** A short statement about who performs the work, shown under the hero. */
  note?: string;
};

export type Offer = { title: string; body: string; items?: string[] };

export type Step = { title: string; body: string };

export type Faq = { q: string; a: string };

export type Service = {
  practice: PracticeId;
  slug: string;
  name: string;
  /** One line for cards and menus. */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  hero: { title: string; intro: string[]; photo?: PhotoKey };
  /** Who performs the work, when it matters (licensing, independence, member firms). */
  deliveredBy?: { title: string; body: string };
  offers: Offer[];
  approach?: { title: string; steps: Step[] };
  faqs?: Faq[];
  /** Contact form topic used by the call to action. */
  topic: string;
  /** Paths of related services. */
  related: string[];
};

export type Industry = {
  slug: string;
  name: string;
  summary: string;
  metaDescription: string;
  photo: PhotoKey;
  intro: string[];
  issues: Step[];
  /** Paths of the services most often used in this industry. */
  services: string[];
};
