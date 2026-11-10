import type { Industry } from "./types";

export const industries: Industry[] = [
  {
    slug: "technology",
    name: "Technology",
    summary:
      "SOC 2 and ISO 27001 for software companies selling to larger customers, plus the tax questions that come with growth.",
    metaDescription:
      "Advisory, assurance and tax services for software and technology companies: SOC 2, ISO 27001, AI governance, sales tax nexus and R&D credits.",
    photo: "serverHall",
    intro: [
      "Software companies usually meet us when a large customer sends a security questionnaire that ends with a request for a SOC 2 report. Soon after come questions about AI, sales tax in states where the company has never set foot, and research credits.",
      "We help technology companies answer those questions in the order they arrive, without building three separate compliance programs to do it.",
    ],
    issues: [
      { title: "Enterprise sales", body: "SOC 2 and ISO 27001 readiness so security reviews stop slowing down deals." },
      {
        title: "AI in the product",
        body: "Governance and ISO/IEC 42001 readiness for AI features that customers ask about.",
      },
      {
        title: "Multistate tax",
        body: "Sales tax on SaaS varies by state. Nexus studies and registrations keep it under control.",
      },
      {
        title: "Research credits",
        body: "Federal and state credits for development work, documented to survive an exam.",
      },
    ],
    services: [
      "/advisory/certification-and-compliance",
      "/audit-and-assurance/enterprise-assurance",
      "/advisory/artificial-intelligence",
      "/tax/state-and-local-tax",
    ],
  },
  {
    slug: "financial-services",
    name: "Financial services",
    summary:
      "Risk, controls and assurance for lenders, fintechs, asset managers and the service providers they rely on.",
    metaDescription:
      "Advisory, assurance and tax services for financial services firms: cyber risk, SOC 1 reports, internal audit support, regulatory readiness and tax.",
    photo: "stockExchange",
    intro: [
      "Financial services firms answer to examiners, investors and partner banks, each with its own list of requirements. Most of those lists come back to the same controls: access, change management, vendor oversight and incident response.",
      "We help firms meet them once and show the evidence to each audience in the form it expects.",
    ],
    issues: [
      {
        title: "Examiner expectations",
        body: "Cyber risk assessments and governance aligned with FFIEC and state requirements.",
      },
      {
        title: "Service organization reports",
        body: "SOC 1 reports for processors and administrators whose customers rely on them.",
      },
      {
        title: "Internal audit capacity",
        body: "Co-sourced internal audit and IT audit for teams that need specialists.",
      },
      { title: "Vendor oversight", body: "Third-party risk programs that partner banks and examiners accept." },
    ],
    services: [
      "/advisory/cyber-and-risk",
      "/audit-and-assurance/enterprise-assurance",
      "/audit-and-assurance/financial-statement-audits",
      "/tax/federal-tax",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    summary:
      "HIPAA Security Rule risk analysis, HITRUST readiness and assurance for providers and health technology companies.",
    metaDescription:
      "Advisory and assurance for healthcare providers and health technology companies: HIPAA Security Rule risk analysis, HITRUST readiness, SOC 2 and incident readiness.",
    photo: "hospitalCorridor",
    intro: [
      "Healthcare organizations hold some of the most sensitive data there is, and attackers know it. Regulators expect a documented risk analysis, and hospital and payer customers expect their vendors to prove their controls.",
      "We help providers and health technology companies meet those expectations and prepare for the day something goes wrong.",
    ],
    issues: [
      {
        title: "Risk analysis",
        body: "The HIPAA Security Rule risk analysis that regulators ask for first after a breach.",
      },
      {
        title: "Selling to health systems",
        body: "HITRUST and SOC 2 readiness for vendors that hospitals put through security review.",
      },
      {
        title: "Ransomware",
        body: "Readiness reviews and response plans for clinical operations, delivered with Silver Fox.",
      },
    ],
    services: [
      "/advisory/certification-and-compliance",
      "/advisory/cyber-and-risk",
      "/audit-and-assurance/enterprise-assurance",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    summary:
      "Quality and security certification, supplier requirements, and tax for manufacturers with plants in more than one place.",
    metaDescription:
      "Advisory, assurance and tax for manufacturers: ISO 9001 and ISO 27001 readiness, CMMC for defense suppliers, operational technology security and multistate tax.",
    photo: "factoryFloor",
    intro: [
      "Manufacturers are asked for certifications by customers further down the supply chain: ISO 9001 for quality, ISO 27001 or CMMC for security, and increasingly evidence that plant systems are protected.",
      "We help manufacturers prepare for those audits and handle the tax that comes with plants, inventory and sales across states and countries.",
    ],
    issues: [
      {
        title: "Customer requirements",
        body: "ISO 9001, ISO 27001 and CMMC readiness driven by what your customers require.",
      },
      { title: "Plant systems", body: "Security assessments of operational technology, delivered with Silver Fox." },
      {
        title: "Multistate and cross-border",
        body: "Nexus, property tax, credits and transfer pricing for multi-site operations.",
      },
    ],
    services: [
      "/advisory/certification-and-compliance",
      "/advisory/cyber-and-risk",
      "/tax/state-and-local-tax",
      "/tax/international-tax",
    ],
  },
  {
    slug: "energy",
    name: "Energy",
    summary: "Risk, controls and tax for producers, utilities, renewable developers and the companies that serve them.",
    metaDescription:
      "Advisory, assurance and tax for energy companies: cyber risk for operational systems, internal controls, transaction diligence and energy tax credits.",
    photo: "windFarmSunset",
    intro: [
      "Energy companies run physical infrastructure that attackers target, operate under heavy regulation and often grow through acquisitions. Renewable developers add a layer of credit and incentive rules that change with each tax law.",
      "We bring together the cyber, controls and tax work these companies need, with people who understand how the assets operate.",
    ],
    issues: [
      {
        title: "Operational systems",
        body: "Security assessments and response planning for control systems, with Silver Fox.",
      },
      { title: "Acquisitions", body: "Financial, tax and cyber diligence on targets and assets." },
      {
        title: "Energy credits",
        body: "Analysis of federal energy credits and transferability, and the documentation behind them.",
      },
    ],
    services: ["/advisory/cyber-and-risk", "/advisory/transaction-advisory", "/tax/federal-tax"],
  },
  {
    slug: "government-contractors",
    name: "Government contractors",
    summary: "CMMC, NIST SP 800-171, FedRAMP and the controls federal contracts require.",
    metaDescription:
      "Advisory for government contractors: CMMC Level 1 and Level 2 readiness, NIST SP 800-171 gap assessments, SPRS scoring support and FedRAMP readiness.",
    photo: "capitolDome",
    intro: [
      "Defense contractors that handle Controlled Unclassified Information now need CMMC status to win and keep contracts. Civilian agency contractors face FedRAMP and agency security requirements of their own.",
      "We help contractors scope their environments, close the gaps against NIST SP 800-171 and prepare for assessment by an authorized C3PAO.",
    ],
    issues: [
      {
        title: "CMMC Level 2",
        body: "Scoping, gap assessment, system security plans and readiness for a C3PAO assessment.",
      },
      { title: "SPRS scores", body: "An honest NIST SP 800-171 self-assessment score and a plan to improve it." },
      { title: "Cloud services", body: "FedRAMP and StateRAMP readiness for providers selling to government." },
    ],
    services: [
      "/advisory/certification-and-compliance",
      "/advisory/cyber-and-risk",
      "/audit-and-assurance/financial-statement-audits",
    ],
  },
  {
    slug: "private-equity",
    name: "Private equity",
    summary: "Diligence, value creation and exit readiness for sponsors and their portfolio companies.",
    metaDescription:
      "Transaction advisory for private equity: financial, tax, cyber and compliance due diligence, portfolio company readiness and sell-side preparation.",
    photo: "newYorkDusk",
    intro: [
      "Sponsors need to know what they are buying, raise the standard of the business during the hold and present a clean company at exit. Cyber and compliance gaps now come up at every one of those stages.",
      "We support deal teams from diligence through exit, and portfolio companies with the certifications, controls and tax work that buyers will look for.",
    ],
    issues: [
      {
        title: "Diligence",
        body: "Quality of earnings, tax, cyber and compliance diligence in one coordinated report.",
      },
      {
        title: "During the hold",
        body: "SOC 2, ISO 27001 and CMMC readiness that makes portfolio companies easier to sell.",
      },
      { title: "Exit readiness", body: "Sell-side diligence and fixes made before buyers start asking." },
    ],
    services: ["/advisory/transaction-advisory", "/advisory/certification-and-compliance", "/tax/federal-tax"],
  },
  {
    slug: "nonprofit",
    name: "Nonprofit",
    summary: "Audits, Single Audits, Form 990 and controls for nonprofits accountable to donors and grantors.",
    metaDescription:
      "Audit, tax and advisory services for nonprofit organizations: financial statement audits and Single Audits through licensed member firms, Form 990 and internal controls.",
    photo: "volunteers",
    intro: [
      "Nonprofits answer to boards, donors, grantors and, when they spend federal money, to Single Audit requirements. Most run with small finance teams that cannot afford a surprise at year end.",
      "We help nonprofits keep their controls and filings in order, and our licensed CPA member firms perform the audits they need.",
    ],
    issues: [
      { title: "Audits", body: "Financial statement audits and Single Audits performed by licensed CPA member firms." },
      { title: "Form 990", body: "Annual returns and the governance disclosures donors read." },
      { title: "Controls", body: "Practical internal controls for small finance teams." },
    ],
    services: [
      "/audit-and-assurance/financial-statement-audits",
      "/tax/federal-tax",
      "/advisory/technology-modernization",
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
