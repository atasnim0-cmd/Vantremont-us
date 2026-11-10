import { services } from "@/content/services";

/** Options for the "what can we help with" field on the inquiry forms. */
export type Topic = { value: string; label: string; group: string };

const GROUPS: Record<string, string> = {
  advisory: "Advisory",
  "audit-and-assurance": "Audit and assurance",
  tax: "Tax",
};

export const TOPICS: Topic[] = [
  ...services.map((s) => ({ value: `${s.practice}/${s.slug}`, label: s.name, group: GROUPS[s.practice] })),
  { value: "membership", label: "Joining the Vantremont network", group: "Other" },
  { value: "media", label: "Media inquiry", group: "Other" },
  { value: "other", label: "Something else", group: "Other" },
];

export const TOPIC_VALUES = TOPICS.map((t) => t.value) as [string, ...string[]];

/** Maps the short ?topic= values used in links across the site to a form option. */
const ALIASES: Record<string, string> = {
  certification: "advisory/certification-and-compliance",
  cyber: "advisory/cyber-and-risk",
  ai: "advisory/artificial-intelligence",
  technology: "advisory/technology-modernization",
  transaction: "advisory/transaction-advisory",
  audit: "audit-and-assurance/financial-statement-audits",
  soc: "audit-and-assurance/enterprise-assurance",
  "certification-audit": "audit-and-assurance/certification-audits",
  tax: "tax/federal-tax",
};

export function resolveTopic(raw: string | null | undefined): string {
  if (!raw) return "";
  if (TOPIC_VALUES.includes(raw)) return raw;
  return ALIASES[raw] ?? "";
}

export function topicLabel(value: string): string {
  return TOPICS.find((t) => t.value === value)?.label ?? value;
}
