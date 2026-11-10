import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Accessibility",
  description: "Vantremont's commitment to an accessible website, the standard we follow and how to report a problem.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      path="/accessibility"
      intro="We want everyone to be able to use this website, including people who use assistive technology."
    >
      <h2 id="standard">Our standard</h2>
      <p>
        We design and test this website to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA. In
        practice that means:
      </p>
      <ul>
        <li>Every page can be used with a keyboard alone, with a visible focus indicator.</li>
        <li>Text and controls meet AA color contrast.</li>
        <li>Images have text alternatives, and decorative images are hidden from screen readers.</li>
        <li>Forms have labels, explain errors next to the field and move focus to the first error.</li>
        <li>Animation respects the reduced motion setting, and the one looping animation has a pause button.</li>
        <li>Pages work when zoomed to 200 percent and on small screens.</li>
      </ul>

      <h2 id="testing">How we test</h2>
      <p>
        We check pages with automated tools (axe and Lighthouse) and by hand with a keyboard and a screen reader before
        each release. Automated tools cannot find every problem, so we also welcome reports.
      </p>

      <h2 id="report">Report a problem</h2>
      <p>
        If something on this site is hard to use, email{" "}
        <a href={`mailto:${site.email.general}`}>{site.email.general}</a> with the page address and a short description.
        We will reply and, where we can, provide the information in another format while we fix the problem.
      </p>
    </LegalPage>
  );
}
