import { MemberDirectory } from "@/components/network/MemberDirectory";
import { NetworkMap } from "@/components/network/NetworkMap";
import { CtaBand } from "@/components/sections/CtaBand";
import { Notice } from "@/components/sections/Notice";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { members } from "@/content/members";
import { licensing } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Member Firms",
  description:
    "Search the registered Vantremont member firms by name, city, state or service. Each profile lists the firm's confirmed services, locations and accreditations.",
  path: "/member-firms",
});

export default function MemberFirmsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About Vantremont", path: "/about" },
          { name: "Member firms", path: "/member-firms" },
        ]}
        label="Member firms"
        title="Independent firms in the Vantremont network."
        intro={[
          "Every member is a separate company that has registered with Vantremont and meets our membership criteria. Search by firm name, city, state or service to find a member and open its profile.",
        ]}
        aside={
          <div className="border border-stone bg-paper p-6">
            <NetworkMap tone="light" />
          </div>
        }
      />

      <section aria-labelledby="directory" className="container-page py-16 lg:py-20">
        <SectionHeader num="01" label="Directory" id="directory" title="Find a member firm" />
        <div className="mt-10">
          <MemberDirectory members={members} />
        </div>
        <Notice title="About member firms" className="mt-14">
          {licensing.networkDisclaimer}
        </Notice>
      </section>

      <CtaBand
        title="Is your firm a good fit for the network?"
        body="We admit firms that hold the licenses and accreditations their work requires and share our standards on independence."
        primary={{ label: "Join the network", href: "/join-the-network" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
