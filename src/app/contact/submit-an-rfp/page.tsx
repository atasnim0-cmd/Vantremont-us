import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Submit an RFP",
  description: "Send Vantremont a request for proposal for advisory, audit and assurance, or tax services.",
  path: "/contact/submit-an-rfp",
});

export default function RfpPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Contact", path: "/contact" },
          { name: "Submit an RFP", path: "/contact/submit-an-rfp" },
        ]}
        label="Submit an RFP"
        title="Send us your request for proposal."
        intro={[
          "Attach the RFP document if you have one, and tell us when the response is due. We will confirm receipt and name the person leading our response.",
        ]}
      />
      <section aria-label="RFP submission" className="container-page py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <h2 className="font-serif text-[1.75rem] leading-tight text-ink">Before you send</h2>
            <ul className="prose-body">
              <li>Attachments can be PDF or Word (.docx) files up to 4&nbsp;MB.</li>
              <li>
                For larger packages, or a portal invitation, email {site.email.rfp} and we will reply with instructions.
              </li>
              <li>If the RFP requires an independence or conflict check, we run it before we respond.</li>
            </ul>
          </div>
          <div className="lg:col-span-8">
            <InquiryForm kind="rfp" />
          </div>
        </div>
      </section>
    </>
  );
}
