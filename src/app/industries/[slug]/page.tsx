import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { relatedItem } from "@/components/pages/PracticePages";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks, type RelatedItem } from "@/components/sections/RelatedLinks";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getIndustry, industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return pageMetadata({
    title: `${ind.name} Industry Services`,
    description: ind.metaDescription,
    path: `/industries/${slug}`,
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const services = ind.services.map(relatedItem).filter((x): x is RelatedItem => x !== null);
  const others = industries.filter((i) => i.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Industries", path: "/industries" },
          { name: ind.name, path: `/industries/${slug}` },
        ]}
        label="Industry"
        title={ind.name}
        intro={ind.intro}
        photo={ind.photo}
        actions={<ButtonLink href="/contact/request-a-meeting">Request a meeting</ButtonLink>}
      />

      <section aria-labelledby="issues" className="container-page py-20 lg:py-24">
        <SectionHeader
          num="01"
          label="What we work on"
          id="issues"
          title={`Common work for ${ind.name.toLowerCase()} clients`}
        />
        <ol className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {ind.issues.map((it, i) => (
            <li key={it.title} className="rule pt-6">
              <span className="tabular font-serif text-3xl text-claret">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{it.title}</h3>
              <p className="mt-2 leading-relaxed">{it.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="services" className="border-t border-stone bg-paper">
        <div className="container-page py-20 lg:py-24">
          <SectionHeader num="02" label="Services" id="services" title="Services most often used" />
          <div className="mt-10">
            <RelatedLinks items={services} />
          </div>
        </div>
      </section>

      <section aria-labelledby="other" className="border-t border-stone">
        <div className="container-page py-20 lg:py-24">
          <SectionHeader num="03" label="Industries" id="other" title="Other industries" />
          <div className="mt-10">
            <RelatedLinks
              items={others.map((o) => ({ title: o.name, href: `/industries/${o.slug}`, summary: o.summary }))}
            />
          </div>
        </div>
      </section>

      <CtaBand title={`Talk to our ${ind.name.toLowerCase()} team.`} />
    </>
  );
}
