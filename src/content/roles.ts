/**
 * Open roles.
 *
 * Every role below is a starter draft written for the owner to review. None is open
 * until HR confirms it is real, sets the location and work model, and publishes a pay
 * range. Several states (including California, Colorado, Illinois, New York and
 * Washington) require a good-faith pay range in job postings. The launch check fails
 * on the live domain while any role still carries a LAUNCH-CONFIRM or
 * LAUNCH-PLACEHOLDER marker.
 */

export type RolePractice = "Audit" | "Tax" | "Risk advisory" | "Cybersecurity";
export type RoleLevel = "Senior" | "Manager" | "Experienced";

export type Role = {
  slug: string;
  title: string;
  practice: RolePractice;
  level: RoleLevel;
  location: string;
  workModel: string;
  employmentType: "Full time";
  /** Annual base pay in US dollars. null until HR sets the range. */
  pay: { min: number; max: number } | null;
  summary: string;
  about: string[];
  responsibilities: string[];
  qualifications: string[];
  niceToHave: string[];
  /** Extra notes shown on the role page, for example scope limits or clearance needs. */
  notes?: string[];
};

export const roles: Role[] = [
  {
    slug: "audit-senior",
    title: "Audit Senior",
    practice: "Audit",
    level: "Senior",
    location: "United States", // LAUNCH-CONFIRM: role is real and open; confirm location and work model with HR
    workModel: "Hybrid",
    employmentType: "Full time",
    pay: null, // LAUNCH-PLACEHOLDER: pay range
    summary:
      "Run fieldwork on financial statement audits and reviews of private companies and nonprofits, and coach staff along the way.",
    about: [
      "Audit Seniors run the day-to-day work on financial statement audits and reviews. You plan the fieldwork with the manager, lead the client relationship during the engagement and review the work of staff accountants.",
      "Audit engagements are performed by licensed CPA firms in the Vantremont network.",
    ],
    responsibilities: [
      "Plan and run fieldwork on audits and reviews under GAAS and SSARS",
      "Assess risk and design audit procedures with the engagement manager",
      "Review staff workpapers and give specific, useful feedback",
      "Draft financial statements, footnotes and management letter comments",
      "Keep the client informed about progress, requests and findings",
    ],
    qualifications: [
      "CPA license, or eligibility to sit for the CPA exam in your state",
      "Two to four years of audit experience in public accounting",
      "Working knowledge of US GAAP and auditing standards",
      "Clear written English and the ability to explain findings to non-accountants",
    ],
    niceToHave: [
      "Experience with nonprofit audits or Single Audits",
      "Experience with audit data analytics tools",
      "Experience in technology, manufacturing or financial services clients",
    ],
  },
  {
    slug: "audit-manager",
    title: "Audit Manager",
    practice: "Audit",
    level: "Manager",
    location: "United States", // LAUNCH-CONFIRM: role is real and open; confirm location and work model with HR
    workModel: "Hybrid",
    employmentType: "Full time",
    pay: null, // LAUNCH-PLACEHOLDER: pay range
    summary:
      "Manage a portfolio of audit engagements from planning to report, and develop the seniors and staff who work on them.",
    about: [
      "Audit Managers own a portfolio of engagements. You set the plan, manage budgets and deadlines, review the work and are the person clients call when something important comes up.",
      "Audit engagements are performed by licensed CPA firms in the Vantremont network.",
    ],
    responsibilities: [
      "Manage several audit, review and agreed-upon procedures engagements at once",
      "Review workpapers and financial statements for quality and compliance with standards",
      "Lead planning, risk assessment and communication with those charged with governance",
      "Manage engagement budgets, billing and scheduling",
      "Support the firm's quality management system and peer review readiness",
      "Coach and evaluate seniors and staff",
    ],
    qualifications: [
      "Active CPA license",
      "Five to eight years of audit experience in public accounting, including supervising engagements",
      "Strong knowledge of US GAAP, GAAS and independence rules",
      "Experience managing client relationships directly",
    ],
    niceToHave: [
      "Experience with Single Audits under the Uniform Guidance",
      "Experience with SOC 1 or SOC 2 examinations",
      "Experience leading audits of companies backed by private equity",
    ],
  },
  {
    slug: "tax-senior",
    title: "Tax Senior",
    practice: "Tax",
    level: "Senior",
    location: "United States", // LAUNCH-CONFIRM: role is real and open; confirm location and work model with HR
    workModel: "Hybrid",
    employmentType: "Full time",
    pay: null, // LAUNCH-PLACEHOLDER: pay range
    summary:
      "Prepare and review federal and state returns for corporations, partnerships and their owners, and support planning projects.",
    about: [
      "Tax Seniors handle a mix of compliance and planning for business clients. You prepare and first-review returns, research technical questions and work directly with client finance teams.",
    ],
    responsibilities: [
      "Prepare and review federal and state returns for C corporations, S corporations and partnerships",
      "Prepare and review income tax provisions under ASC 740",
      "Research technical questions and write clear memos",
      "Respond to notices from the IRS and state tax authorities",
      "Support planning, nexus and credit projects",
      "Review the work of staff and give practical feedback",
    ],
    qualifications: [
      "CPA license or Enrolled Agent credential",
      "Three to five years of business tax experience in public accounting or a corporate tax department",
      "Working knowledge of partnership and corporate tax rules",
    ],
    niceToHave: [
      "Experience with state and local tax or multistate filings",
      "Experience with research credit studies",
      "Experience with international information returns",
    ],
  },
  {
    slug: "tax-attorney-tax-advisory",
    title: "Tax Attorney, Tax Advisory",
    practice: "Tax",
    level: "Experienced",
    location: "United States", // LAUNCH-CONFIRM: role is real and open; confirm location and work model with HR
    workModel: "Hybrid",
    employmentType: "Full time",
    pay: null, // LAUNCH-PLACEHOLDER: pay range
    summary:
      "Bring legal training to complex tax planning, research and controversy support in our tax advisory practice.",
    about: [
      "This is a tax advisory role for a lawyer who wants to work on tax planning in a professional services firm. You research difficult technical questions, design planning ideas, and support clients through IRS examinations alongside our CPAs.",
      "Large accounting firms hire tax professionals with law degrees for the same reason we do: the work turns on reading statutes, regulations and cases closely.",
    ],
    notes: [
      "Vantremont is not a law firm and does not provide legal services. In this role you will provide tax advisory services as part of our tax practice. You will not act as a client's attorney or give legal advice on behalf of the firm.",
    ],
    responsibilities: [
      "Research complex federal, state and international tax questions and write technical memos",
      "Develop and model tax planning ideas for business clients and their owners",
      "Support IRS and state examinations and appeals as part of the tax advisory team",
      "Review transaction documents for tax consequences, working with the client's legal counsel",
      "Train colleagues on new legislation, regulations and guidance",
    ],
    qualifications: [
      "Juris Doctor (JD) from an ABA-accredited law school",
      "Three or more years of tax experience at an accounting firm, law firm or corporate tax department",
      "Strong research and writing skills",
    ],
    niceToHave: [
      "LL.M. in Taxation",
      "Admission to a state bar",
      "CPA license",
      "Experience with partnership taxation, mergers and acquisitions or international tax",
    ],
  },
  {
    slug: "risk-and-compliance-consultant",
    title: "Risk and Compliance Consultant",
    practice: "Risk advisory",
    level: "Experienced",
    location: "United States", // LAUNCH-CONFIRM: role is real and open; confirm location and work model with HR
    workModel: "Remote, with some travel",
    employmentType: "Full time",
    pay: null, // LAUNCH-PLACEHOLDER: pay range
    summary: "Lead gap assessments and readiness projects for ISO/IEC 27001, SOC 2 and NIST frameworks.",
    about: [
      "Risk and Compliance Consultants help clients prepare for certification and attestation audits. You run gap assessments, design controls with client teams, review evidence and tell clients plainly whether they are ready.",
      "Advisory and certification are kept separate in our network, so you will not audit the clients you advise.",
    ],
    responsibilities: [
      "Run gap assessments against ISO/IEC 27001, SOC 2 Trust Services Criteria and NIST frameworks",
      "Write and review policies, procedures and risk assessments with client teams",
      "Plan remediation and track it to completion",
      "Run readiness reviews that test controls the way an auditor would",
      "Write clear reports for executives and for technical teams",
    ],
    qualifications: [
      "Three or more years in information security governance, risk and compliance, IT audit or consulting",
      "Hands-on experience with at least one of ISO/IEC 27001, SOC 2 or NIST SP 800-53",
      "Comfort presenting findings to executives",
    ],
    niceToHave: [
      "CISA, CISSP, CRISC or ISO/IEC 27001 Lead Implementer or Lead Auditor",
      "Experience with ISO/IEC 42001 or AI governance",
      "Experience with GRC platforms",
    ],
  },
  {
    slug: "penetration-tester",
    title: "Penetration Tester",
    practice: "Cybersecurity",
    level: "Experienced",
    location: "United States", // LAUNCH-CONFIRM: role is real and open; confirm location, work model and employing firm with HR
    workModel: "Remote, with some travel",
    employmentType: "Full time",
    pay: null, // LAUNCH-PLACEHOLDER: pay range
    summary:
      "Test networks, applications and cloud environments, and write reports that tell clients exactly what to fix.",
    about: [
      "Penetration Testers find out what an attacker could reach in a client's environment, and how far they would get. You run tests within agreed rules of engagement and write findings that engineers can act on.",
      "Our testing work is delivered with Silver Fox, a cybersecurity consulting firm in the Vantremont network.",
    ],
    responsibilities: [
      "Run external, internal, web application and cloud penetration tests",
      "Test Active Directory and identity attack paths",
      "Write clear findings with evidence, risk ratings and specific fixes",
      "Retest after remediation and confirm fixes work",
      "Present results to technical teams and to leadership",
    ],
    qualifications: [
      "Three or more years of hands-on penetration testing",
      "OSCP or an equivalent practical certification",
      "Experience with common testing tools and the judgment to work beyond them",
      "Strong report writing",
    ],
    niceToHave: [
      "OSWE, OSEP, CRTO or GPEN",
      "Experience testing AWS, Azure or Google Cloud",
      "Experience with red team or assumed breach engagements",
    ],
  },
  {
    slug: "grc-and-cmmc-consultant",
    title: "GRC and CMMC Consultant",
    practice: "Risk advisory",
    level: "Experienced",
    location: "United States", // LAUNCH-CONFIRM: role is real and open; confirm location and work model with HR
    workModel: "Remote, with some travel",
    employmentType: "Full time",
    pay: null, // LAUNCH-PLACEHOLDER: pay range
    summary:
      "Help defense contractors scope their environments, close NIST SP 800-171 gaps and prepare for CMMC assessments.",
    about: [
      "GRC and CMMC Consultants work with defense contractors that handle Federal Contract Information and Controlled Unclassified Information. You help them scope their environments, assess against NIST SP 800-171 and prepare for assessment by an authorized C3PAO.",
    ],
    notes: [
      "Some client work involves Controlled Unclassified Information and may require that you qualify as a US person under export control regulations. We will tell you before an offer if the role requires it.",
    ],
    responsibilities: [
      "Scope CUI environments and enclaves with client IT teams",
      "Run NIST SP 800-171 gap assessments and help clients calculate SPRS scores",
      "Write system security plans and plans of action and milestones",
      "Guide remediation and review evidence before assessment",
      "Keep clients informed about changes to CMMC requirements",
    ],
    qualifications: [
      "Three or more years in GRC, IT audit or security consulting",
      "Hands-on experience with NIST SP 800-171 or CMMC",
      "Strong documentation and writing skills",
    ],
    niceToHave: [
      "Certified CMMC Professional (CCP) or Certified CMMC Assessor (CCA)",
      "Experience with Microsoft 365 GCC High or other government cloud environments",
      "Experience with DFARS 252.204-7012 incident reporting",
    ],
  },
  {
    slug: "soc-analyst-tier-2",
    title: "Security Operations (SOC) Analyst, Tier 2",
    practice: "Cybersecurity",
    level: "Experienced",
    location: "United States", // LAUNCH-CONFIRM: role is real and open; confirm location, shift pattern and employing firm with HR
    workModel: "Remote, shift based",
    employmentType: "Full time",
    pay: null, // LAUNCH-PLACEHOLDER: pay range
    summary:
      "Investigate escalated alerts, lead response on confirmed incidents and improve detections for client environments.",
    about: [
      "Tier 2 analysts take escalations from Tier 1, decide what is real, and lead the first response when it is. You also tune detections so the team spends its time on alerts that matter.",
      "Managed detection and response is delivered with Silver Fox, a cybersecurity consulting firm in the Vantremont network.",
    ],
    responsibilities: [
      "Investigate escalated alerts across SIEM, EDR, identity and cloud logs",
      "Contain confirmed incidents and coordinate with client teams",
      "Write clear incident summaries for clients",
      "Tune detection rules and reduce false positives",
      "Mentor Tier 1 analysts",
    ],
    qualifications: [
      "Two to four years in a security operations or incident response role",
      "Hands-on experience with at least one SIEM and one EDR platform",
      "Working knowledge of Windows, Linux, identity and network attack techniques",
      "Willingness to work a rotating schedule, including some nights and weekends",
    ],
    niceToHave: ["GCIH, GCIA, CySA+ or similar", "Scripting in Python or PowerShell", "Experience with threat hunting"],
  },
  {
    slug: "cloud-security-consultant",
    title: "Cloud Security Consultant",
    practice: "Cybersecurity",
    level: "Experienced",
    location: "United States", // LAUNCH-CONFIRM: role is real and open; confirm location, work model and employing firm with HR
    workModel: "Remote",
    employmentType: "Full time",
    pay: null, // LAUNCH-PLACEHOLDER: pay range
    summary:
      "Assess and harden AWS, Azure and Google Cloud environments, and help clients design security into new builds.",
    about: [
      "Cloud Security Consultants review how clients build and run in the cloud, find misconfigurations and design fixes that engineering teams will accept. You also support compliance projects that need cloud evidence.",
      "Cloud security work is delivered with Silver Fox, a cybersecurity consulting firm in the Vantremont network.",
    ],
    responsibilities: [
      "Assess cloud configurations, identity and network design",
      "Review infrastructure as code and deployment pipelines",
      "Design guardrails, logging and monitoring",
      "Support SOC 2, ISO/IEC 27001 and FedRAMP readiness with cloud evidence",
      "Write findings and fixes engineers can apply directly",
    ],
    qualifications: [
      "Three or more years securing workloads in AWS, Azure or Google Cloud",
      "Experience with infrastructure as code such as Terraform",
      "Strong understanding of cloud identity and access management",
    ],
    niceToHave: [
      "AWS Certified Security Specialty, Azure Security Engineer Associate or CCSP",
      "Kubernetes security experience",
      "Experience with cloud security posture management tools",
    ],
  },
];

export const ROLE_PRACTICES: RolePractice[] = ["Audit", "Tax", "Risk advisory", "Cybersecurity"];
export const ROLE_LEVELS: RoleLevel[] = ["Senior", "Manager", "Experienced"];

export function getRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function payLabel(r: Role): string {
  return r.pay ? `${usd.format(r.pay.min)} to ${usd.format(r.pay.max)} per year` : "Pay range to be published";
}

export const EEO_STATEMENT =
  "Vantremont is an equal opportunity employer. We consider all qualified applicants for employment without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, age, disability, genetic information, veteran status or any other characteristic protected by law. If you need an accommodation during the application process, email us and we will work with you.";
