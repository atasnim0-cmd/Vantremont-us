import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import { relatedItem } from "@/components/pages/PracticePages";
import { locationLine } from "@/components/network/MemberCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { Notice } from "@/components/sections/Notice";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks, type RelatedItem } from "@/components/sections/RelatedLinks";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getMember, members, shownLocations } from "@/content/members";
import { memberSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/member-firms/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) return {};
  return pageMetadata({
    title: m.placeholder ? "Member Firm" : `${m.name}, Member Firm`,
    description: m.summary,
    path: `/member-firms/${slug}`,
    // The directory is search-only, so profiles stay out of search engines and the sitemap.
    noindex: true,
  });
}

export default async function MemberPage({ params }: PageProps<"/member-firms/[slug]">) {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) notFound();
  const related = m.vantremontServices.map(relatedItem).filter((x): x is RelatedItem => x !== null);
  const locations = shownLocations(m);
  const host = m.website ? new URL(m.website).host : null;

  return (
    <>
      {!m.placeholder && <JsonLd data={memberSchema(m)} />}
      <PageHero
        crumbs={[
          { name: "Member firms", path: "/member-firms" },
          { name: m.placeholder ? "Member firm" : m.name, path: `/member-firms/${slug}` },
        ]}
        label={m.kind}
        title={m.placeholder ? "Member firm profile to be announced" : m.name}
        intro={m.overview}
        photo={m.slug === "silver-fox" ? "dallasSunset" : undefined}
      />

      {!m.placeholder && (
        <section aria-labelledby="profile" className="container-page py-20 lg:py-24">
          <h2 id="profile" className="sr-only">
            Firm profile
          </h2>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeader num="01" label="Services" title={`What ${m.name} does`} />
              <ul className="mt-8 divide-y divide-stone border-y border-stone">
                {m.services.map((s) => (
                  <li key={s} className="py-3.5 text-lg text-ink">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-16">
                <SectionHeader num="02" label="Accreditations" title="Licenses and accreditations" />
                {m.accreditations.length > 0 ? (
                  <ul className="mt-8 divide-y divide-stone border-y border-stone">
                    {m.accreditations.map((a) => (
                      <li key={a.name} className="py-4">
                        <p className="text-lg font-semibold text-ink">{a.name}</p>
                        <p className="text-slate">
                          Granted by {a.body}
                          {a.scope ? `. Scope: ${a.scope}` : ""}
                        </p>
                        {a.verifyUrl && (
                          <a href={a.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-link text-sm">
                            Verify with {a.body}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-8 max-w-2xl border-l-2 border-stone-dark pl-5 leading-relaxed">
                    {m.accreditationNote ?? "This firm has not listed any accreditations."}
                  </p>
                )}
              </div>
            </div>

            <aside aria-label={`${m.name} details`} className="lg:col-span-5">
              <dl className="border border-stone bg-paper p-7">
                <div className="border-b border-stone pb-5">
                  <dt className="text-xs font-semibold tracking-[0.14em] text-claret uppercase">Legal name</dt>
                  <dd className="mt-1 text-lg text-ink" translate="no">
                    {m.legalName}
                  </dd>
                </div>
                <div className="border-b border-stone py-5">
                  <dt className="text-xs font-semibold tracking-[0.14em] text-claret uppercase">Where it operates</dt>
                  <dd className="mt-1 text-lg text-ink">{locationLine(m)}</dd>
                  {locations.length === 0 && <dd className="text-sm text-slate">Not yet confirmed.</dd>}
                </div>
                <div className="border-b border-stone py-5">
                  <dt className="text-xs font-semibold tracking-[0.14em] text-claret uppercase">Service areas</dt>
                  <dd className="mt-1 text-lg text-ink">{m.areas.join(", ")}</dd>
                </div>
                <div className="pt-5">
                  <dt className="text-xs font-semibold tracking-[0.14em] text-claret uppercase">Contact</dt>
                  {m.website && host && (
                    <dd className="mt-2">
                      <a
                        href={m.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-11 items-center gap-2 font-semibold text-ink hover:text-claret"
                      >
                        <span className="link-underline">{host}</span>
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-claret" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </dd>
                  )}
                  {m.email && (
                    <dd>
                      <a
                        href={`mailto:${m.email}`}
                        className="group inline-flex min-h-11 items-center gap-2 font-semibold text-ink hover:text-claret"
                      >
                        <Mail aria-hidden="true" className="h-4 w-4 text-claret" />
                        <span className="link-underline">{m.email}</span>
                      </a>
                    </dd>
                  )}
                </div>
              </dl>
              <Notice title="Independent firm" className="mt-6">
                {m.name} is a separate legal entity and a registered member of the Vantremont network. It is responsible
                only for its own work and contracts directly with its clients.
              </Notice>
            </aside>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="with-vantremont" className="border-t border-stone bg-paper">
          <div className="container-page py-20 lg:py-24">
            <SectionHeader
              num="03"
              label="With Vantremont"
              id="with-vantremont"
              title={`Vantremont services delivered with ${m.name}`}
            />
            <div className="mt-10">
              <RelatedLinks items={related} />
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={m.placeholder ? "See the firms already in the network." : `Work with ${m.name} through Vantremont.`}
        primary={m.placeholder ? { label: "Search member firms", href: "/member-firms" } : undefined}
        secondary={m.placeholder ? null : undefined}
      />
    </>
  );
}
