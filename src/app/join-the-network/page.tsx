import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StepList } from "@/components/sections/StepList";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Join the Network",
  description:
    "Membership criteria and application for independent cybersecurity, audit, tax, advisory and certification firms that want to join the Vantremont network.",
  path: "/join-the-network",
});

// LAUNCH-CONFIRM: membership criteria and admission steps agreed by the owner
const CRITERIA = [
  {
    title: "Licensed and accredited for your work",
    body: "Audit and attest work requires a CPA firm license. Certification work requires accreditation from an IAF member accreditation body for the standards you certify. We check both directly with the issuing body.",
  },
  {
    title: "Independence you can document",
    body: "You have written policies for independence and conflicts of interest, and you will apply the network rule that keeps advisory and certification for the same client separate.",
  },
  {
    title: "Insurance and quality management",
    body: "You carry professional liability insurance suited to your services, and you run a quality management system appropriate to them, such as peer review for CPA firms.",
  },
  {
    title: "Facts you are willing to publish",
    body: "Your profile lists your real locations, services and accreditations. You agree to tell us promptly when any of them change.",
  },
];

const STEPS = [
  { title: "Apply", body: "Send the form below. Tell us about your firm, its licenses and accreditations." },
  { title: "Conversation", body: "We meet your leadership to discuss your work, your clients and how you would fit." },
  { title: "Verification", body: "We verify licenses, accreditations and insurance with the issuing bodies." },
  {
    title: "Agreement",
    body: "We sign a membership agreement that sets out independence, quality and branding rules.",
  },
  { title: "Listing", body: "Your profile goes live in the member directory once you approve every fact on it." },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Member firms", path: "/member-firms" },
          { name: "Join the network", path: "/join-the-network" },
        ]}
        label="Join the network"
        title="Membership for independent firms that hold themselves to the same standard."
        intro={[
          "Member firms stay independent. They keep their own name, clients, contracts and liability. Membership gives them access to Vantremont clients who need their services, and a shared standard on independence and quality.",
        ]}
      />

      <section aria-labelledby="criteria" className="container-page py-20 lg:py-24">
        <SectionHeader num="01" label="Criteria" id="criteria" title="What we look for" />
        <ol className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {CRITERIA.map((c, i) => (
            <li key={c.title} className="rule pt-6">
              <span className="tabular font-serif text-3xl text-claret">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-serif text-[1.5rem] leading-tight text-ink">{c.title}</h3>
              <p className="mt-3 max-w-xl leading-relaxed">{c.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="process" className="border-y border-stone bg-paper">
        <div className="container-page py-20 lg:py-24">
          <SectionHeader num="02" label="Process" id="process" title="How membership works" />
          <div className="mt-12">
            <StepList steps={STEPS} />
          </div>
        </div>
      </section>

      <section aria-labelledby="apply" className="container-page py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader num="03" label="Apply" id="apply" title="Apply to join" />
            <p className="mt-6 leading-relaxed">
              Applying does not commit you to anything. We treat everything you send as confidential and use it only to
              assess the application.
            </p>
          </div>
          <div className="lg:col-span-8">
            <InquiryForm kind="membership" />
          </div>
        </div>
      </section>
    </>
  );
}
