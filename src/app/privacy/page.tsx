import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Vantremont collects, uses and protects personal information submitted through this website, including information from job applicants.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const privacy = site.email.privacy;
  return (
    <LegalPage
      title="Privacy policy"
      path="/privacy"
      intro="This policy explains what personal information this website collects, why, who receives it and what choices you have."
    >
      <h2 id="scope">Who this policy covers</h2>
      <p>
        This policy applies to {site.url.replace("https://", "")} and to information you send us through it. Member
        firms are separate companies with their own privacy policies; when you contact a member firm directly, its
        policy applies.
      </p>

      <h2 id="collect">What we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>
          <strong>Contact, meeting and RFP forms:</strong> your name, email address, organization, job title and phone
          number if you provide them, the topic, your message and any document you attach.
        </li>
        <li>
          <strong>Network membership applications:</strong> your name and contact details, your firm&apos;s name,
          website, country, type, licenses and accreditations, and your message.
        </li>
        <li>
          <strong>Job applications:</strong> see the applicant section below.
        </li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Server logs:</strong> our hosting provider, Vercel, records technical information such as IP address,
          browser type and pages requested, to deliver the site and protect it from abuse.
        </li>
        <li>
          <strong>Analytics:</strong> we use Vercel Web Analytics to count page views. It does not use cookies and does
          not build profiles of individual visitors.
        </li>
        <li>
          <strong>Spam protection:</strong> our forms use Cloudflare Turnstile to tell people from automated programs.
          Turnstile processes limited technical information about your browser and device for that purpose.
        </li>
      </ul>
      <p>We do not use advertising cookies, and we do not sell or share personal information for advertising.</p>

      <h2 id="use">How we use it</h2>
      <ul>
        <li>To reply to your message, arrange a meeting or respond to an RFP</li>
        <li>To assess a membership application or a job application</li>
        <li>To run independence and conflict checks before accepting an engagement</li>
        <li>To keep the website secure and working</li>
        <li>To meet legal obligations</li>
      </ul>

      <h2 id="sharing">Who receives it</h2>
      <p>
        Form submissions are delivered to our team by email through Resend, our email delivery provider. If your inquiry
        concerns a service performed by a member firm, we may share it with that firm so it can respond, and we will
        tell you when we do. We also use service providers for hosting (Vercel) and spam protection (Cloudflare). They
        process information only on our instructions.
      </p>
      <p>We may disclose information when the law requires it or to protect our rights and the safety of others.</p>

      <h2 id="applicants">Job applicants</h2>
      <p>When you apply for a role, we collect:</p>
      <ul>
        <li>Your name, email address, phone number, city and state, and LinkedIn profile if you provide it</li>
        <li>Your resume and cover note, and the role you applied for</li>
        <li>
          Your answers to two questions: whether you are authorized to work in the United States, and whether you need
          visa sponsorship
        </li>
      </ul>
      <p>
        We use this information only to assess your application, contact you about it and meet our legal obligations as
        an employer. We do not ask for your age, race, religion, or any other characteristic protected by law, and we
        ask you not to include them in your resume. If we later collect information for equal opportunity reporting, it
        will be voluntary and kept separate from hiring decisions.
      </p>
      <p>
        Applications are seen only by the recruiting team and the people involved in hiring for the role. We keep
        applications for up to two years after the role is filled so that we can consider you for similar roles and meet
        record-keeping obligations, unless you ask us to delete yours sooner where the law allows.{" "}
        {/* LAUNCH-CONFIRM: applicant data retention period agreed with counsel */}
      </p>
      <p>
        To ask about, correct or delete your application, email{" "}
        <a href={`mailto:${site.email.careers}`}>{site.email.careers}</a>.
      </p>

      <h2 id="retention">How long we keep information</h2>
      <p>
        We keep inquiry and RFP information for as long as needed to respond and to maintain business records, and
        membership applications for as long as the application or membership is active plus a reasonable period after.
        Applicant information is covered above.
      </p>

      <h2 id="security">Security</h2>
      <p>
        The site is served only over encrypted connections, and form submissions are validated on the server. No method
        of transmission or storage is completely secure, so please do not send passwords, account numbers or other
        sensitive details through our forms.
      </p>

      <h2 id="rights">Your choices and rights</h2>
      <p>
        Depending on where you live, you may have the right to know what personal information we hold about you, to ask
        us to correct or delete it, and to object to certain uses. To make a request, email{" "}
        <a href={`mailto:${privacy}`}>{privacy}</a>. We will verify the request and reply within the time the law
        requires. We will not treat you differently for exercising these rights.
      </p>

      <h2 id="children">Children</h2>
      <p>
        This website is meant for businesses and adults. We do not knowingly collect information from children under 13.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        We will post any changes here and update the date at the top of the page. Significant changes will also be noted
        on the home page for a reasonable period.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about this policy: <a href={`mailto:${privacy}`}>{privacy}</a>.
      </p>
    </LegalPage>
  );
}
