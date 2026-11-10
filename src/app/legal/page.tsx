import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { licensing, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Legal and Disclosures",
  description:
    "Legal disclosures for Vantremont: network structure, licensing of attest services, certification independence, tax and legal advice, and security reporting.",
  path: "/legal",
});

export default function LegalDisclosuresPage() {
  return (
    <LegalPage
      title="Legal and disclosures"
      path="/legal"
      intro="How Vantremont and its member firms are organized, who performs which services, and what this website does and does not offer."
    >
      <h2 id="network">Vantremont and its member firms</h2>
      <p>{licensing.networkDisclaimer}</p>
      <p>
        The names of member firms are used with their permission. A member firm&apos;s listing on this site does not
        mean that Vantremont guarantees or supervises its work.
      </p>

      <h2 id="attest">Audit and attest services</h2>
      <p>
        {licensing.vantremontIsCpaFirm
          ? "Vantremont is a licensed CPA firm in the states where it holds a license. Some attest services are performed by other licensed CPA firms in the network, which are named in the engagement letter."
          : licensing.attestDisclosure}
      </p>
      <p>
        Where this website describes financial statement audits, reviews, SOC examinations or other attest services,
        those services are offered only through a firm licensed to provide them in the relevant jurisdiction.
      </p>

      <h2 id="certification">Certification services</h2>
      <p>
        Certification audits are performed by member firms accredited as certification bodies, within the scope of their
        accreditation. Accreditations are listed on each member&apos;s profile.
      </p>
      <p>{licensing.certificationIndependence}</p>

      <h2 id="tax-legal">Tax services and legal advice</h2>
      <p>
        Vantremont is not a law firm and does not provide legal services. Tax professionals at Vantremont, including
        those with law degrees, provide tax advisory services and do not act as attorneys for clients.
      </p>

      <h2 id="no-advice">Information on this website</h2>
      <p>
        The content of this website is general information. It is not accounting, tax, legal or other professional
        advice and should not be relied on as such. A professional relationship begins only when you and the responsible
        firm sign an engagement letter.
      </p>
      <p>
        References to standards, frameworks and laws (for example ISO/IEC 27001, SOC 2, CMMC, HIPAA and PCI DSS) are
        descriptive. Names of standards and frameworks belong to their owners, and their use does not imply endorsement.
      </p>

      <h2 id="photography">Photography</h2>
      <p>
        Photographs on this website are licensed stock images. They do not show Vantremont staff, offices or clients
        unless a caption says so.
      </p>

      <h2 id="security">Reporting a security issue</h2>
      <p>
        If you believe you have found a security vulnerability in this website, please email{" "}
        <a href={`mailto:${site.email.security}`}>{site.email.security}</a>. Please do not access data that is not
        yours, disrupt the service or publish details before we have had a reasonable chance to fix the issue. Our
        contact details are also published at <a href="/.well-known/security.txt">/.well-known/security.txt</a>.
      </p>

      <h2 id="more">Related pages</h2>
      <ul>
        <li>
          <Link href="/privacy">Privacy policy</Link>
        </li>
        <li>
          <Link href="/terms">Terms of use</Link>
        </li>
        <li>
          <Link href="/governance-and-independence">Governance and independence</Link>
        </li>
      </ul>
    </LegalPage>
  );
}
