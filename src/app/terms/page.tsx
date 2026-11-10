import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { licensing, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that apply when you use the Vantremont website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      path="/terms"
      intro="By using this website you agree to these terms. Please read them."
    >
      <h2 id="about">About this website</h2>
      <p>
        This website is operated by {site.legalName}. It describes the services of Vantremont and of the independent
        member firms in the Vantremont network. {licensing.networkDisclaimer}
      </p>

      <h2 id="no-advice">No professional advice</h2>
      <p>
        Content on this website is general information and is not accounting, audit, tax, legal or other professional
        advice. Do not act on it without advice that considers your circumstances. Sending us a message does not create
        a client relationship; that begins only when you and the responsible firm sign an engagement letter.
      </p>

      <h2 id="submissions">What you send us</h2>
      <p>
        Please do not send confidential or sensitive information through our forms until an engagement letter is in
        place. By submitting a form you confirm that the information is accurate and that you are entitled to share it.
        How we handle it is explained in our <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2 id="use">Acceptable use</h2>
      <ul>
        <li>Do not attempt to gain unauthorized access to the website or the systems behind it.</li>
        <li>Do not interfere with the website, including by sending automated or excessive requests.</li>
        <li>Do not use the website to send unlawful, misleading or harmful content.</li>
      </ul>
      <p>
        Security researchers acting in good faith should follow the reporting process on our{" "}
        <Link href="/legal#security">legal page</Link>.
      </p>

      <h2 id="ip">Intellectual property</h2>
      <p>
        The Vantremont name, logo and the content of this website belong to {site.legalName} or its licensors. You may
        view and print pages for your own reference. Any other use needs our written permission. Photographs are
        licensed from third parties and may not be reused from this site.
      </p>

      <h2 id="links">Links to other websites</h2>
      <p>
        Links to member firm websites and other sites are provided for convenience. We are not responsible for their
        content or their privacy practices.
      </p>

      <h2 id="liability">Disclaimers and limitation of liability</h2>
      <p>
        The website is provided as is. We try to keep it accurate and available but do not promise that it will always
        be either. To the extent the law allows, we are not liable for any loss arising from use of the website or
        reliance on its content.
      </p>

      <h2 id="law">Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Texas, without regard to its conflict of laws rules.{" "}
        {/* LAUNCH-CONFIRM: governing law and venue confirmed by counsel */}
      </p>

      <h2 id="changes">Changes</h2>
      <p>We may update these terms. The date at the top of the page shows when they last changed.</p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.email.general}`}>{site.email.general}</a>.
      </p>
    </LegalPage>
  );
}
