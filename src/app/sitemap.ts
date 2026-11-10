import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { roles } from "@/content/roles";
import { practices, servicePath, services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/what-we-do", priority: 0.9 },
    ...practices.map((p) => ({ path: p.path, priority: 0.9 })),
    ...services.map((s) => ({ path: servicePath(s), priority: 0.8 })),
    { path: "/industries", priority: 0.7 },
    ...industries.map((i) => ({ path: `/industries/${i.slug}`, priority: 0.7 })),
    { path: "/about", priority: 0.6 },
    { path: "/leadership", priority: 0.5 },
    { path: "/member-firms", priority: 0.7 },
    { path: "/join-the-network", priority: 0.5 },
    { path: "/governance-and-independence", priority: 0.5 },
    { path: "/careers", priority: 0.7 },
    ...roles.map((r) => ({ path: `/careers/${r.slug}`, priority: 0.6 })),
    { path: "/contact", priority: 0.7 },
    { path: "/contact/request-a-meeting", priority: 0.7 },
    { path: "/contact/submit-an-rfp", priority: 0.6 },
    { path: "/legal", priority: 0.2 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
    { path: "/accessibility", priority: 0.2 },
  ];
  return pages.map((p) => ({ url: absoluteUrl(p.path), changeFrequency: "monthly", priority: p.priority }));
}
