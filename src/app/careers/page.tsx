import Image from "next/image";
import { RoleList } from "@/components/careers/RoleList";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StepList } from "@/components/sections/StepList";
import { photos } from "@/content/photos";
import { EEO_STATEMENT, ROLE_LEVELS, ROLE_PRACTICES, payLabel, roles } from "@/content/roles";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Careers at Vantremont in audit, tax, risk advisory and cybersecurity. Every role lists its pay range, location and work model.",
  path: "/careers",
});

// LAUNCH-CONFIRM: working practices and hiring steps below are agreed with HR
const WHY = [
  {
    title: "Work that has to be right",
    body: "Our clients put our work in front of auditors, regulators and buyers. You will learn to do careful work and to explain it plainly.",
  },
  {
    title: "Pay ranges in every posting",
    body: "Each role lists its pay range, location and work model before you apply, in every state.",
  },
  {
    title: "Exposure across practices",
    body: "Audit, tax, advisory and cybersecurity teams work on the same clients. You will see how the pieces fit.",
  },
];

const PROCESS = [
  { title: "Apply", body: "Send your resume and a short note through the role page. It takes about ten minutes." },
  {
    title: "First conversation",
    body: "A short call with our recruiting team about the role, pay and your questions.",
  },
  { title: "Interviews", body: "Conversations with the people you would work with, about real work you have done." },
  {
    title: "Practical exercise",
    body: "For some technical roles, a short exercise that reflects the job. Never unpaid client work.",
  },
  { title: "Decision", body: "We tell every applicant our decision, including when we do not move forward." },
];

export default function CareersPage() {
  const items = roles.map((r) => ({
    slug: r.slug,
    title: r.title,
    practice: r.practice,
    level: r.level,
    location: r.location,
    workModel: r.workModel,
    summary: r.summary,
    pay: payLabel(r),
  }));

  return (
    <>
      <PageHero
        crumbs={[{ name: "Careers", path: "/careers" }]}
        label="Careers"
        title="Careers in audit, tax, advisory and cybersecurity."
        intro={[
          "We hire accountants, tax professionals, risk consultants and security engineers who like getting the details right. Most of our work prepares companies for the moment someone outside checks their claims.",
        ]}
        photo="teamLaptop"
      />

      <section aria-labelledby="why" className="container-page py-20 lg:py-24">
        <SectionHeader num="01" label="Working here" id="why" title="What to expect" />
        <ol className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {WHY.map((w, i) => (
            <li key={w.title} className="rule pt-6">
              <span className="tabular font-serif text-3xl text-claret">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-serif text-[1.5rem] leading-tight text-ink">{w.title}</h3>
              <p className="mt-3 leading-relaxed">{w.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="benefits" className="border-y border-stone bg-paper">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[18rem] overflow-hidden lg:min-h-[30rem]">
            <Image
              src={photos.strategyConversation.src}
              alt={photos.strategyConversation.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-5 py-16 sm:px-8 lg:px-16 lg:py-24 xl:px-24">
            <SectionHeader num="02" label="Benefits" id="benefits" title="Benefits" />
            {/* LAUNCH-PLACEHOLDER: replace with the confirmed benefits package from HR */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              Details of health coverage, retirement savings, paid time off and support for professional credentials
              will be published here and in each role posting once confirmed.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-slate">
              Questions in the meantime? Email{" "}
              <a href={`mailto:${site.email.careers}`} className="text-link">
                {site.email.careers}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="process" className="container-page py-20 lg:py-24">
        <SectionHeader num="03" label="Hiring process" id="process" title="How hiring works" />
        <div className="mt-12">
          <StepList steps={PROCESS} />
        </div>
      </section>

      <section aria-labelledby="open-roles-heading" id="open-roles" className="border-t border-stone">
        <div className="container-page py-20 lg:py-24">
          <SectionHeader num="04" label="Open roles" id="open-roles-heading" title="Open roles" />
          <div className="mt-10">
            <RoleList roles={items} practices={ROLE_PRACTICES} levels={ROLE_LEVELS} />
          </div>
          <p className="mt-12 max-w-3xl border-t border-stone pt-6 text-sm leading-relaxed text-slate">
            {EEO_STATEMENT}
          </p>
        </div>
      </section>
    </>
  );
}
