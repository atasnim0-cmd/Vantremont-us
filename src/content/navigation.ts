import { industries } from "./industries";
import { practices, servicePath, servicesFor } from "./services";

export type NavLink = { label: string; href: string; description?: string };
export type NavColumn = { title: string; href: string; links: NavLink[] };
export type NavGroup = {
  id: string;
  label: string;
  href: string;
  columns: NavColumn[];
  /** Short note in the menu's side panel. */
  aside: { title: string; body: string; href: string; cta: string };
};

export function getNavigation(): NavGroup[] {
  return [
    {
      id: "what-we-do",
      label: "What we do",
      href: "/what-we-do",
      columns: [
        ...practices.map((p) => ({
          title: p.name,
          href: p.path,
          links: [
            { label: `${p.name} overview`, href: p.path },
            ...servicesFor(p.id).map((s) => ({ label: s.name, href: servicePath(s) })),
          ],
        })),
        {
          title: "Industries",
          href: "/industries",
          links: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
        },
      ],
      aside: {
        title: "Preparing for an audit?",
        body: "See how a company moves from gap assessment to certification, and who does what along the way.",
        href: "/advisory/certification-and-compliance",
        cta: "Certification and compliance",
      },
    },
    {
      id: "who-we-are",
      label: "Who we are",
      href: "/about",
      columns: [
        {
          title: "Who we are",
          href: "/about",
          links: [
            {
              label: "About Vantremont",
              href: "/about",
              description: "What we do, how the network works and who we serve.",
            },
            { label: "Leadership", href: "/leadership", description: "The people accountable for the firm." },
            {
              label: "Member firms",
              href: "/member-firms",
              description: "Independent firms in the network, with their services and accreditations.",
            },
            {
              label: "Join the network",
              href: "/join-the-network",
              description: "Membership criteria and how to apply.",
            },
            {
              label: "Governance and independence",
              href: "/governance-and-independence",
              description: "How we keep advisory, audit and certification separate.",
            },
          ],
        },
      ],
      aside: {
        title: "A network of independent firms",
        body: "Each member firm is a separate legal entity, responsible for its own work. Read how the network is governed.",
        href: "/governance-and-independence",
        cta: "Governance and independence",
      },
    },
  ];
}

/** Plain links shown after the menus. */
export const navLinks: NavLink[] = [
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];
