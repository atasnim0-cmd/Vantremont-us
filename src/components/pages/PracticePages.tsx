import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { Notice } from "@/components/sections/Notice";
import { OfferGrid } from "@/components/sections/OfferGrid";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks, type RelatedItem } from "@/components/sections/RelatedLinks";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StepList } from "@/components/sections/StepList";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { industries } from "@/content/industries";
import { getPractice, getService, practices, serviceByPath, servicePath, servicesFor } from "@/content/services";
import type { PracticeId } from "@/content/types";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/** Titles for related links that point at pages other than services. */
const OTHER_PAGES: Record<string, RelatedItem> = {
  "/member-firms": {
    title: "Member firms",
    href: "/member-firms",
    summary: "Members, their services and their accreditations.",
  },
  "/member-firms/silver-fox": {
    title: "Silver Fox",
    href: "/member-firms/silver-fox",
    summary: "The cybersecurity member firm that delivers our technical security work.",
  },
  "/governance-and-independence": {
    title: "Governance and independence",
    href: "/governance-and-independence",
    summary: "How advisory, audit and certification are kept apart.",
  },
};

export function relatedItem(path: string): RelatedItem | null {
  const s = serviceByPath(path);
  if (s) return { title: s.name, href: path, summary: s.summary };
  if (path.startsWith("/industries/")) {
    const i = industries.find((x) => `/industries/${x.slug}` === path);
    return i ? { title: i.name, href: path, summary: i.summary } : null;
  }
  return OTHER_PAGES[path] ?? null;
}

/* ------------------------------------------------------------------ */
/* Practice overview                                                   */
/* ------------------------------------------------------------------ */

export function practiceMetadata(id: PracticeId): Metadata {
  const p = getPractice(id);
  return pageMetadata({ title: `${p.name} Services`, description: p.metaDescription, path: p.path });
}

export function PracticeOverview({ id }: { id: PracticeId }) {
  const p = getPractice(id);
  const list = servicesFor(id);
  const others = practices.filter((x) => x.id !== id);
  return (
    <>
      <PageHero
        crumbs={[
          { name: "What we do", path: "/what-we-do" },
          { name: p.name, path: p.path },
        ]}
        label={p.name}
        title={p.hero.title}
        intro={p.hero.intro}
        photo={p.hero.photo}
        actions={
          <>
            <ButtonLink href="/contact/request-a-meeting">Request a meeting</ButtonLink>
            <ButtonLink href="/contact/submit-an-rfp" variant="secondary" arrow={false}>
              Submit an RFP
            </ButtonLink>
          </>
        }
      />
      {p.note && (
        <div className="container-page pt-14">
          <Notice title="Who does the work">{p.note}</Notice>
        </div>
      )}
      <section aria-labelledby="services" className="container-page py-20 lg:py-24">
        <SectionHeader num="01" label="Services" id="services" title={`${p.name} services`} />
        <ul className="mt-12 border-t border-stone-dark">
          {list.map((s, i) => (
            <li key={s.slug} className="border-b border-stone-dark">
              <Link
                href={servicePath(s)}
                className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline lg:grid-cols-[3rem_22rem_1fr_auto]"
              >
                <span className="tabular text-sm font-semibold text-slate">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-[1.75rem] leading-tight text-ink transition-colors group-hover:text-claret">
                  {s.name}
                </span>
                <span className="max-w-xl leading-relaxed text-body sm:col-start-2 lg:col-start-3">{s.summary}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="arrow-nudge hidden h-5 w-5 text-claret sm:col-start-3 sm:row-start-1 sm:block lg:col-start-4"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="other-practices" className="border-t border-stone bg-paper">
        <div className="container-page py-20 lg:py-24">
          <SectionHeader num="02" label="Also from Vantremont" id="other-practices" title="Other practices" />
          <div className="mt-10">
            <RelatedLinks
              items={[
                ...others.map((o) => ({ title: o.name, href: o.path, summary: o.summary })),
                { title: "Industries", href: "/industries", summary: "The industries where our work concentrates." },
              ]}
            />
          </div>
        </div>
      </section>
      <CtaBand
        title={`Talk to our ${p.name.toLowerCase()} team.`}
        body="Tell us about the deadline and who is asking. We will tell you what the work involves and who would do it."
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Service detail                                                      */
/* ------------------------------------------------------------------ */

type SlugProps = { params: Promise<{ slug: string }> };

export function serviceRoute(id: PracticeId) {
  return {
    generateStaticParams() {
      return servicesFor(id).map((s) => ({ slug: s.slug }));
    },
    async generateMetadata({ params }: SlugProps): Promise<Metadata> {
      const { slug } = await params;
      const s = getService(id, slug);
      if (!s) return {};
      return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: servicePath(s) });
    },
    async Page({ params }: SlugProps) {
      const { slug } = await params;
      return <ServiceDetail id={id} slug={slug} />;
    },
  };
}

function ServiceDetail({ id, slug }: { id: PracticeId; slug: string }) {
  const s = getService(id, slug);
  if (!s) notFound();
  const p = getPractice(id);
  const path = servicePath(s);
  const related = s.related.map(relatedItem).filter((x): x is RelatedItem => x !== null);
  const topicHref = `?topic=${s.practice}/${s.slug}`;
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <>
      <JsonLd data={serviceSchema({ name: s.name, description: s.metaDescription, path })} />
      {s.faqs && <JsonLd data={faqSchema(s.faqs)} />}
      <PageHero
        crumbs={[
          { name: p.name, path: p.path },
          { name: s.name, path },
        ]}
        label={s.name}
        title={s.hero.title}
        intro={s.hero.intro}
        photo={s.hero.photo}
        actions={
          <>
            <ButtonLink href={`/contact/request-a-meeting${topicHref}`}>Request a meeting</ButtonLink>
            <ButtonLink href={`/contact/submit-an-rfp${topicHref}`} variant="secondary" arrow={false}>
              Submit an RFP
            </ButtonLink>
          </>
        }
      />

      {s.deliveredBy && (
        <div className="container-page pt-14">
          <Notice title={s.deliveredBy.title}>{s.deliveredBy.body}</Notice>
        </div>
      )}

      <section aria-labelledby="offer" className="container-page py-20 lg:py-24">
        <SectionHeader num={num()} label="What we do" id="offer" title="What the work covers" />
        <div className="mt-12">
          <OfferGrid offers={s.offers} />
        </div>
      </section>

      {s.approach && (
        <section aria-labelledby="approach" className="border-y border-stone bg-paper">
          <div className="container-page py-20 lg:py-24">
            <SectionHeader num={num()} label="How it works" id="approach" title={s.approach.title} />
            <div className="mt-12">
              <StepList steps={s.approach.steps} />
            </div>
          </div>
        </section>
      )}

      {s.faqs && (
        <section aria-labelledby="questions" className="container-page py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader num={num()} label="Questions" id="questions" title="Common questions" />
            </div>
            <div className="lg:col-span-8">
              <FaqList faqs={s.faqs} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related" className="border-t border-stone">
          <div className="container-page py-20 lg:py-24">
            <SectionHeader num={num()} label="Related" id="related" title="Related services" />
            <div className="mt-10">
              <RelatedLinks items={related} />
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Tell us about your deadline."
        body="Most engagements start with a short conversation about scope and timing. We will tell you what the work involves, who would do it and what it would cost."
        primary={{ label: "Request a meeting", href: `/contact/request-a-meeting${topicHref}` }}
        secondary={{ label: "Submit an RFP", href: `/contact/submit-an-rfp${topicHref}` }}
      />
    </>
  );
}
