import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Notice } from "@/components/sections/Notice";
import { PageHero } from "@/components/sections/PageHero";
import { EEO_STATEMENT, getRole, payLabel, roles } from "@/content/roles";
import { site } from "@/content/site";
import { jobPostingSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = getRole(slug);
  if (!r) return {};
  return pageMetadata({ title: `${r.title}, Careers`, description: r.summary, path: `/careers/${slug}` });
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="rule pt-6">
      <h2 className="font-serif text-[1.75rem] leading-tight text-ink">{title}</h2>
      <ul className="prose-body mt-5 text-[1.0625rem]">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </section>
  );
}

export default async function RolePage({ params }: PageProps<"/careers/[slug]">) {
  const { slug } = await params;
  const r = getRole(slug);
  if (!r) notFound();
  const details = [
    { label: "Practice", value: r.practice },
    { label: "Level", value: r.level },
    { label: "Location", value: r.location },
    { label: "Work model", value: r.workModel },
    { label: "Employment", value: r.employmentType },
    { label: "Pay range", value: payLabel(r) },
  ];

  return (
    <>
      {/* Structured data only for roles with a published pay range, which HR sets once a role is confirmed. */}
      {r.pay && (
        <JsonLd
          data={jobPostingSchema({
            title: r.title,
            description: [r.summary, ...r.about].join(" "),
            path: `/careers/${slug}`,
            employmentType: r.employmentType,
            datePosted: new Date(site.legalLastUpdated).toISOString().slice(0, 10),
            pay: r.pay,
            remote: /remote/i.test(r.workModel),
          })}
        />
      )}
      <PageHero
        crumbs={[
          { name: "Careers", path: "/careers" },
          { name: r.title, path: `/careers/${slug}` },
        ]}
        label={`${r.practice}, ${r.level.toLowerCase()}`}
        title={r.title}
        intro={[r.summary]}
        aside={
          <dl className="border border-stone bg-paper p-7">
            {details.map((d, i) => (
              <div key={d.label} className={i === 0 ? "pb-4" : "border-t border-stone py-4 last:pb-0"}>
                <dt className="text-xs font-semibold tracking-[0.14em] text-claret uppercase">{d.label}</dt>
                <dd className="mt-1 text-lg text-ink">{d.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <div className="container-page grid grid-cols-1 gap-14 py-16 lg:grid-cols-12 lg:py-20">
        <div className="space-y-12 lg:col-span-7">
          <section className="space-y-4 text-lg leading-relaxed">
            <h2 className="sr-only">About the role</h2>
            {r.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </section>
          {r.notes?.map((n) => (
            <Notice key={n.slice(0, 24)} title="Please note">
              {n}
            </Notice>
          ))}
          <List title="What you will do" items={r.responsibilities} />
          <List title="What you bring" items={r.qualifications} />
          <List title="Nice to have" items={r.niceToHave} />
          <section className="rule pt-6">
            <h2 className="font-serif text-[1.75rem] leading-tight text-ink">Equal opportunity</h2>
            <p className="mt-4 leading-relaxed">{EEO_STATEMENT}</p>
            <p className="mt-3 text-slate">
              Accommodation requests:{" "}
              <a href={`mailto:${site.email.careers}`} className="text-link">
                {site.email.careers}
              </a>
            </p>
          </section>
        </div>
        <div id="apply" className="lg:col-span-5">
          <div>
            <ApplicationForm roles={roles.map((x) => ({ slug: x.slug, title: x.title }))} defaultRole={r.slug} />
          </div>
        </div>
      </div>
    </>
  );
}
