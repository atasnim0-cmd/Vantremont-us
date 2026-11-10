import type { Practice, PracticeId, Service } from "./types";

/**
 * The three practices and every service page under them.
 *
 * Accuracy notes, checked November 2026. Re-check once a year:
 *   - SOC 1, SOC 2 and SOC 3 reports are attestation engagements under AICPA standards.
 *     Only a licensed CPA firm can perform and sign them.
 *   - There is no official HIPAA certification. Work is framed as a Security Rule risk
 *     analysis and readiness, never as certification.
 *   - PCI DSS assessments (Reports on Compliance) are performed by Qualified Security
 *     Assessor companies. CMMC Level 2 certification assessments are performed by
 *     authorized C3PAOs. Our advisory work prepares clients for both.
 *   - ISO/IEC 17021-1 requires certification bodies to stay independent from
 *     consulting on the systems they certify. See licensing.certificationIndependence.
 */

export const practices: Practice[] = [
  {
    id: "advisory",
    name: "Advisory",
    path: "/advisory",
    summary:
      "Certification readiness, cyber and risk, AI governance, technology and transaction work for companies that answer to auditors, regulators and buyers.",
    metaDescription:
      "Vantremont advisory services: certification and compliance readiness for ISO 27001, SOC 2, CMMC, HIPAA and PCI DSS, cyber and risk advisory, AI governance, technology modernization and transaction advisory.",
    hero: {
      title: "Advice that holds up when an auditor, a regulator or a buyer looks closely.",
      intro: [
        "Most of our advisory work starts with an outside deadline: a customer asking for a SOC 2 report, a defense contract that needs CMMC, a buyer running diligence, a board asking how the company uses AI.",
        "We help leadership teams understand what is being asked of them, close the gaps that matter and arrive at the audit or the closing table prepared.",
      ],
      photo: "strategyConversation",
    },
    note: "When we advise you on a management system, a member certification body will not certify you for the same system. We help you choose an accredited body that is independent of your advisor.",
  },
  {
    id: "audit-and-assurance",
    name: "Audit and assurance",
    path: "/audit-and-assurance",
    summary:
      "Financial statement audits, SOC reports and certification audits, performed by licensed and accredited firms in the Vantremont network.",
    metaDescription:
      "Financial statement audits, SOC 1, SOC 2 and SOC 3 examinations, internal audit support and certification audits, delivered through licensed CPA firms and accredited certification bodies in the Vantremont network.",
    hero: {
      title: "Independent opinions from firms licensed and accredited to give them.",
      intro: [
        "An audit opinion or a certificate is only worth something if the firm behind it is qualified and independent. That is why our audit and assurance services are performed by member firms that hold the license or accreditation the work requires.",
        "Vantremont coordinates the engagement and keeps the standard consistent across the network. The member firm that signs the report is named in the engagement letter and takes responsibility for it.",
      ],
      photo: "documentReview",
    },
    note: "Vantremont is not a licensed CPA firm. Audits and SOC examinations are performed and signed by independent, licensed CPA firms in our network.",
  },
  {
    id: "tax",
    name: "Tax",
    path: "/tax",
    summary: "Federal, state and local, and international tax compliance and planning for companies and their owners.",
    metaDescription:
      "Federal tax, state and local tax, and international tax services from Vantremont: compliance, provisions, credits, nexus, transfer pricing and cross-border planning.",
    hero: {
      title: "Tax work that keeps pace with how your company actually operates.",
      intro: [
        "Companies rarely get into tax trouble on purpose. They hire in a new state, sell into a new country or change how they are owned, and the filings do not catch up.",
        "Our tax teams handle the compliance work every year and look ahead at the decisions that change your tax position, so you hear about them before they are made rather than after.",
      ],
      photo: "taxForms",
    },
  },
];

export function getPractice(id: PracticeId): Practice {
  const p = practices.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown practice ${id}`);
  return p;
}

export const services: Service[] = [
  /* ------------------------------------------------------------------ */
  /* Advisory                                                            */
  /* ------------------------------------------------------------------ */
  {
    practice: "advisory",
    slug: "certification-and-compliance",
    name: "Certification and compliance advisory",
    summary:
      "Readiness for ISO 27001, SOC 2, CMMC, HIPAA, PCI DSS and other frameworks, from gap assessment to audit day.",
    metaTitle: "Certification and Compliance Advisory: ISO 27001, SOC 2, CMMC, HIPAA, PCI DSS",
    metaDescription:
      "Gap assessments, remediation support and readiness reviews for ISO/IEC 27001, SOC 2, CMMC, HIPAA and PCI DSS. Advisory and certification are kept separate.",
    hero: {
      title: "Get ready for the audit before the auditor arrives.",
      intro: [
        "A certification or attestation report is often the price of entry for a contract. The audit itself is not the hard part. The hard part is the months before it, when policies have to be written, controls put in place and evidence collected in a form an auditor will accept.",
        "We run that preparation with you. We start with a gap assessment against the framework, plan the remediation with your team, check that the evidence is complete and then hand you over to an independent auditor or certification body.",
      ],
      photo: "evidenceBinders",
    },
    deliveredBy: {
      title: "Advisory and certification stay separate",
      body: "Under ISO/IEC 17021-1, a certification body may not certify a management system it, or a body related to it, helped to build. We apply that rule across the network: if we advise you, a member certification body will not certify you for the same system. For SOC reports, the examination is performed by a licensed CPA firm that did not design your controls.",
    },
    offers: [
      {
        title: "Information security and privacy",
        body: "Management systems and attestation reports that customers ask for most often.",
        items: [
          "ISO/IEC 27001:2022 information security management",
          "ISO/IEC 27701 privacy information management",
          "SOC 2 Type 1 and Type 2 readiness",
          "SOC 1 readiness for service organizations",
          "NIST Cybersecurity Framework 2.0 assessments",
        ],
      },
      {
        title: "Government and defense",
        body: "Requirements that come with federal contracts and federal data.",
        items: [
          "CMMC Level 1 self-assessments and Level 2 readiness",
          "NIST SP 800-171 gap assessments and SPRS scoring support",
          "System security plans and plans of action and milestones",
          "FedRAMP and StateRAMP readiness",
        ],
      },
      {
        title: "Healthcare and payments",
        body: "Sector rules where the obligation is set by law or by the card brands.",
        items: [
          "HIPAA Security Rule risk analysis and remediation planning",
          "PCI DSS 4.0.1 scoping, gap assessment and readiness",
          "HITRUST readiness",
        ],
      },
      {
        title: "Quality, continuity and AI",
        body: "Management system standards outside security.",
        items: ["ISO 9001 quality management", "ISO 22301 business continuity", "ISO/IEC 42001 AI management systems"],
      },
    ],
    approach: {
      title: "From first conversation to audit",
      steps: [
        {
          title: "Scope",
          body: "We agree which framework, which systems, which locations and which deadline. Scope decides cost, so we settle it first and put it in writing.",
        },
        {
          title: "Gap assessment",
          body: "We compare what you do today with what the framework requires and rate each gap by effort and audit risk.",
        },
        {
          title: "Remediation",
          body: "Your team fixes the gaps with our help: policies, procedures, control design, tooling choices and evidence collection.",
        },
        {
          title: "Readiness review",
          body: "We test the controls the way an auditor would, sample the evidence and tell you plainly whether you are ready.",
        },
        {
          title: "Handoff",
          body: "You engage an independent auditor or accredited certification body. We stay available to answer questions about what we built, not to defend it on the auditor's behalf.",
        },
      ],
    },
    faqs: [
      {
        q: "Can Vantremont certify us after advising us?",
        a: "No. Advisory and certification for the same client and the same management system are kept separate within the network. We will help you choose an accredited certification body or a licensed CPA firm that is independent of your advisor.",
      },
      {
        q: "Is there such a thing as HIPAA certification?",
        a: "No. HHS does not certify organizations under HIPAA. What we provide is a Security Rule risk analysis and a plan to address what it finds, which is what regulators and business partners expect to see.",
      },
      {
        q: "How long does readiness take?",
        a: "It depends on the framework and on how much is already in place. A focused SOC 2 Type 1 readiness project is usually measured in weeks. CMMC Level 2 for a company starting from little documentation is usually measured in months. We give you an estimate after the gap assessment, not before.",
      },
    ],
    topic: "certification",
    related: [
      "/advisory/cyber-and-risk",
      "/audit-and-assurance/enterprise-assurance",
      "/audit-and-assurance/certification-audits",
    ],
  },
  {
    practice: "advisory",
    slug: "cyber-and-risk",
    name: "Cyber and risk advisory",
    summary:
      "Risk assessments, penetration testing, security leadership and incident readiness, delivered with our cybersecurity member firms.",
    metaTitle: "Cyber and Risk Advisory",
    metaDescription:
      "Cyber risk assessments, penetration testing, virtual CISO services and incident response readiness, delivered with cybersecurity firms in the Vantremont network, including Silver Fox.",
    hero: {
      title: "Know which risks matter, then deal with those first.",
      intro: [
        "Security spending grows one tool and one audit at a time. After a few years it is hard to say which risks are covered and which are still open.",
        "Our cyber and risk work gives leadership a clear read on exposure, tests whether the controls work under pressure and builds a program that holds up to questions from the board, customers and insurers.",
      ],
      photo: "serverHall",
    },
    deliveredBy: {
      title: "Delivered with member firms",
      body: "Technical security work, including penetration testing, security engineering and incident response, is delivered with cybersecurity firms in the Vantremont network, including Silver Fox in Texas. Each member firm is a separate company and contracts for the work it performs.",
    },
    offers: [
      {
        title: "Risk and governance",
        body: "Decisions about where the next dollar goes, backed by evidence.",
        items: [
          "Enterprise cyber risk assessments",
          "Third-party and supplier risk reviews",
          "Virtual and fractional CISO services",
          "Board and executive briefings",
          "Support with cyber insurance applications",
        ],
      },
      {
        title: "Testing",
        body: "Find out what an attacker could reach before someone else does.",
        items: [
          "Network, cloud and application penetration testing",
          "Red team and assumed breach exercises",
          "Social engineering assessments",
          "Retesting after remediation",
        ],
      },
      {
        title: "Readiness and response",
        body: "Plans that work when the day comes.",
        items: [
          "Incident response plans and tabletop exercises",
          "Ransomware readiness reviews",
          "Incident response and digital forensics",
          "Managed detection and response",
        ],
      },
    ],
    approach: {
      title: "How an engagement runs",
      steps: [
        {
          title: "Understand",
          body: "What the business depends on, what it would cost to lose, and what is already in place.",
        },
        {
          title: "Assess",
          body: "Interviews, configuration reviews and testing, rated on criticality, exposure and consequence.",
        },
        { title: "Prioritize", body: "A short list of fixes in order of risk reduced per dollar spent." },
        { title: "Verify", body: "Retesting and follow-up so the board sees progress, not only a report." },
      ],
    },
    topic: "cyber",
    related: ["/advisory/certification-and-compliance", "/member-firms/silver-fox", "/advisory/transaction-advisory"],
  },
  {
    practice: "advisory",
    slug: "artificial-intelligence",
    name: "Artificial intelligence",
    summary: "AI governance, ISO/IEC 42001 readiness and AI risk assessments for companies building or buying AI.",
    metaTitle: "AI Governance, ISO/IEC 42001 and AI Risk Advisory",
    metaDescription:
      "AI governance programs, ISO/IEC 42001 readiness, NIST AI RMF assessments and AI risk reviews for companies that build, buy or sell AI systems.",
    hero: {
      title: "Use AI in a way you can explain to a customer, a regulator and your board.",
      intro: [
        "Customers now ask how your products use AI, what data trains the models and who checks the output. Regulators in the United States, the European Union and elsewhere are asking the same questions with more force.",
        "We help you put a governance program around AI that matches the risk: an inventory of where AI is used, rules for approving new uses, controls for data and vendors, and evidence you can show when asked.",
      ],
      photo: "teamLaptop",
    },
    offers: [
      {
        title: "Governance",
        body: "Rules and roles for how AI is approved, built and monitored.",
        items: [
          "AI use inventories and risk classification",
          "AI policies, approval workflows and accountability",
          "ISO/IEC 42001 AI management system readiness",
          "NIST AI Risk Management Framework assessments",
        ],
      },
      {
        title: "Risk and assurance",
        body: "Evidence that specific AI systems behave as intended.",
        items: [
          "AI system risk and impact assessments",
          "Vendor and model due diligence",
          "Security reviews of AI applications, with Silver Fox",
          "Readiness for EU AI Act obligations that apply to you",
        ],
      },
    ],
    topic: "ai",
    related: [
      "/advisory/certification-and-compliance",
      "/advisory/technology-modernization",
      "/advisory/cyber-and-risk",
    ],
  },
  {
    practice: "advisory",
    slug: "technology-modernization",
    name: "Technology modernization",
    summary: "ERP and finance system selection, cloud migration planning and IT controls built in from the start.",
    metaTitle: "Technology Modernization Advisory",
    metaDescription:
      "Finance and ERP system selection, cloud migration planning, IT general controls and technology roadmaps that hold up in an audit.",
    hero: {
      title: "Replace old systems without creating new audit findings.",
      intro: [
        "A new ERP, a cloud migration or a move off spreadsheets can make a company faster. Done without the auditors in mind, it can also break the controls the last audit relied on.",
        "We help finance and technology leaders choose systems, plan the move and design controls into the new setup, so the next audit tests a better process rather than a broken one.",
      ],
      photo: "chartReview",
    },
    offers: [
      {
        title: "Planning and selection",
        body: "Decide what to change, in what order, and with which vendor.",
        items: [
          "Technology roadmaps tied to business plans",
          "Finance system and ERP selection",
          "Cloud migration planning and cost reviews",
        ],
      },
      {
        title: "Controls and data",
        body: "Keep the evidence trail intact through the change.",
        items: [
          "IT general controls design and testing",
          "Access, change management and segregation of duties",
          "Data migration controls and reconciliation",
          "Pre-implementation reviews for audit readiness",
        ],
      },
    ],
    topic: "technology",
    related: [
      "/advisory/artificial-intelligence",
      "/audit-and-assurance/enterprise-assurance",
      "/advisory/cyber-and-risk",
    ],
  },
  {
    practice: "advisory",
    slug: "transaction-advisory",
    name: "Transaction advisory",
    summary: "Financial, tax, cyber and compliance due diligence for buyers, sellers and lenders.",
    metaTitle: "Transaction Advisory and Due Diligence",
    metaDescription:
      "Financial due diligence, quality of earnings, tax diligence, and cyber and compliance diligence for private equity buyers, strategic acquirers and sellers.",
    hero: {
      title: "Diligence that finds the problem before it becomes yours.",
      intro: [
        "Buyers have always looked at earnings and tax exposure. Today they also need to know whether the target has had a breach it has not found yet, whether its certifications are real and current, and whether its contracts depend on compliance it cannot prove.",
        "Our transaction teams cover the financial and tax questions and, with Silver Fox, the cyber and compliance ones, in a single report that a deal team can act on.",
      ],
      photo: "glassTower",
    },
    offers: [
      {
        title: "Buy side",
        body: "Know what you are buying and what it will cost to fix.",
        items: [
          "Financial due diligence and quality of earnings",
          "Tax due diligence and structuring input",
          "Cyber due diligence, including external exposure reviews",
          "Compliance diligence: certifications, SOC reports, CMMC status",
          "Post-close integration and first-100-day plans",
        ],
      },
      {
        title: "Sell side",
        body: "Find the issues a buyer will find, while there is still time to address them.",
        items: [
          "Sell-side quality of earnings",
          "Vendor due diligence reports",
          "Readiness reviews ahead of a sale process",
        ],
      },
    ],
    topic: "transaction",
    related: ["/advisory/cyber-and-risk", "/tax/federal-tax", "/industries/private-equity"],
  },

  /* ------------------------------------------------------------------ */
  /* Audit and assurance                                                 */
  /* ------------------------------------------------------------------ */
  {
    practice: "audit-and-assurance",
    slug: "financial-statement-audits",
    name: "Financial statement audits",
    summary:
      "Audits, reviews and compilations of private company financial statements, performed by licensed CPA member firms.",
    metaTitle: "Financial Statement Audits, Reviews and Compilations",
    metaDescription:
      "Financial statement audits, reviews and compilations for private companies and nonprofits, performed and signed by licensed CPA firms in the Vantremont network.",
    hero: {
      title: "An audit your lenders, investors and board can rely on.",
      intro: [
        "Lenders, investors, regulators and grantors ask for audited or reviewed financial statements because they need an independent opinion. The value of that opinion depends on the independence and the license of the firm that signs it.",
        "Financial statement audits in the Vantremont network are performed by licensed CPA member firms under the standards that apply to your company. Vantremont coordinates the work and sets a common standard for planning, communication and timelines.",
      ],
      photo: "documentReview",
    },
    deliveredBy: {
      title: "Performed by licensed CPA firms",
      body: "Vantremont is not a licensed CPA firm and does not issue audit opinions. Each audit is performed and signed by an independent, licensed CPA firm in the network, which is named in your engagement letter. Firms that provide your advisory or tax services are checked for independence before an audit is accepted.",
    },
    offers: [
      {
        title: "Engagement types",
        body: "The level of assurance that matches what your stakeholders require.",
        // LAUNCH-CONFIRM: CPA member firms offer each engagement type below, including Single Audits
        items: [
          "Audits of private company financial statements",
          "Reviews of financial statements",
          "Compilations and preparation engagements",
          "Audits of nonprofit organizations, including Single Audits where required",
          "Agreed-upon procedures engagements",
        ],
      },
      {
        title: "What to expect",
        body: "The parts of an audit that clients tell us they want handled better.",
        items: [
          "A written plan with dates and a document request list at the start",
          "One point of contact who knows your business",
          "Findings raised as soon as they are found, not at the end",
          "A management letter written in plain language",
        ],
      },
    ],
    topic: "audit",
    related: ["/audit-and-assurance/enterprise-assurance", "/tax/federal-tax", "/governance-and-independence"],
  },
  {
    practice: "audit-and-assurance",
    slug: "enterprise-assurance",
    name: "Enterprise assurance",
    summary: "SOC 1, SOC 2 and SOC 3 examinations and internal audit support, through licensed CPA member firms.",
    metaTitle: "SOC 1, SOC 2 and SOC 3 Reports and Internal Audit Support",
    metaDescription:
      "SOC 1, SOC 2 and SOC 3 examinations performed by licensed CPA firms in the Vantremont network, plus internal audit outsourcing and co-sourcing.",
    hero: {
      title: "SOC reports your customers will accept on the first read.",
      intro: [
        "When your customers rely on your systems, they ask for proof that your controls work. A SOC report is the standard way to give it: an independent CPA firm examines your controls and issues a report your customers and their auditors can use.",
        "SOC examinations in the Vantremont network are performed by licensed CPA member firms. If a Vantremont team helped you prepare, a different firm with no part in designing your controls performs the examination.",
      ],
      photo: "partnersMeeting",
    },
    deliveredBy: {
      title: "Performed by licensed CPA firms",
      body: "SOC 1, SOC 2 and SOC 3 reports are attestation engagements under AICPA standards. They are performed and signed by independent, licensed CPA firms in the network. Vantremont does not sign SOC reports.",
    },
    offers: [
      {
        title: "SOC reports",
        body: "Which report you need depends on who will read it.",
        // LAUNCH-CONFIRM: CPA member firms perform each SOC engagement listed
        items: [
          "SOC 1 Type 1 and Type 2, for controls relevant to customers' financial reporting",
          "SOC 2 Type 1 and Type 2, against the Trust Services Criteria",
          "SOC 3, a general use report you can publish",
          "SOC for Cybersecurity",
          "Bridge letters between reporting periods",
        ],
      },
      {
        title: "Internal audit support",
        body: "Extra hands or specialist skills for your internal audit function.",
        items: [
          "Outsourced and co-sourced internal audit",
          "Risk assessments and annual audit plans",
          "IT audit and SOX readiness support",
          "Quality assessments of internal audit functions",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between a Type 1 and a Type 2 report?",
        a: "A Type 1 report looks at whether your controls are designed properly at a single point in time. A Type 2 report also tests whether they operated effectively over a period, usually six to twelve months. Most customers ask for Type 2.",
      },
      {
        q: "Can the same team prepare us and perform the examination?",
        a: "No. Independence rules prevent a CPA firm from examining controls it designed or implemented. If Vantremont advisory helps you get ready, a different member firm with no role in that work performs the examination.",
      },
    ],
    topic: "soc",
    related: [
      "/advisory/certification-and-compliance",
      "/audit-and-assurance/financial-statement-audits",
      "/governance-and-independence",
    ],
  },
  {
    practice: "audit-and-assurance",
    slug: "certification-audits",
    name: "Certification audits",
    summary: "ISO management system certification audits by accredited certification bodies in the Vantremont network.",
    metaTitle: "ISO Certification Audits",
    metaDescription:
      "Certification audits for ISO management system standards, performed by accredited certification bodies in the Vantremont network, with independence from advisory work.",
    hero: {
      title: "Certification audits from accredited, independent bodies.",
      intro: [
        "A certificate means something only when an accredited body issues it after an independent audit. Some member firms in the Vantremont network are accredited certification bodies. They audit management systems against ISO standards and issue certificates within the scope of their accreditation.",
        "Each member's accreditations, and the accreditation body that granted them, are listed on its profile so you can check them before you engage.",
      ],
      photo: "glassTower",
    },
    deliveredBy: {
      title: "Independent from our advisory work",
      body: "A member certification body will not certify a management system that Vantremont or another member firm helped you design or implement. If you received advisory from the network on the system to be certified, we will tell you, and you can choose another accredited body.",
    },
    offers: [
      {
        title: "How certification works",
        body: "The audit cycle defined by ISO/IEC 17021-1.",
        items: [
          "Application and contract review, including an independence check",
          "Stage 1 audit of documentation and readiness",
          "Stage 2 audit of implementation and effectiveness",
          "Certification decision by people who did not perform the audit",
          "Annual surveillance audits and recertification every three years",
        ],
      },
      {
        title: "Standards",
        body: "Available standards depend on each member's accreditation scope.",
        // LAUNCH-CONFIRM: a member certification body is accredited for each standard listed
        items: [
          "ISO/IEC 27001 information security",
          "ISO 9001 quality",
          "ISO/IEC 42001 AI management systems",
          "Other standards listed on member profiles",
        ],
      },
    ],
    topic: "certification-audit",
    related: ["/member-firms", "/advisory/certification-and-compliance", "/governance-and-independence"],
  },

  /* ------------------------------------------------------------------ */
  /* Tax                                                                 */
  /* ------------------------------------------------------------------ */
  {
    practice: "tax",
    slug: "federal-tax",
    name: "Federal tax",
    summary:
      "Corporate and partnership compliance, tax provisions, credits and planning for companies and their owners.",
    metaTitle: "Federal Tax Services",
    metaDescription:
      "Federal income tax compliance for corporations and partnerships, ASC 740 tax provisions, research credits, IRS controversy support and planning for owners.",
    hero: {
      title: "Federal returns filed right, and fewer surprises in between.",
      intro: [
        "Federal tax rules change most years, and the changes rarely line up with your fiscal calendar. We prepare the returns, prepare the provision your auditors will test, and keep a running view of the decisions that change what you owe.",
      ],
      photo: "taxForms",
    },
    offers: [
      {
        title: "Compliance",
        body: "The filings that come around every year.",
        items: [
          "Corporate and partnership income tax returns",
          "Estimated payments and extensions",
          "Information reporting",
          "Responses to IRS notices",
        ],
      },
      {
        title: "Provision and planning",
        body: "Work that shapes the number before it is final.",
        items: [
          "ASC 740 income tax provisions and reviews",
          "Research credits and research expenditure rules",
          "Entity choice and restructuring",
          "Accounting methods and periods",
          "Planning for owners and executives",
          "IRS examination and appeals support",
        ],
      },
    ],
    topic: "tax",
    related: ["/tax/state-and-local-tax", "/tax/international-tax", "/advisory/transaction-advisory"],
  },
  {
    practice: "tax",
    slug: "state-and-local-tax",
    name: "State and local tax",
    summary: "Nexus, income and franchise tax, sales and use tax, and credits and incentives across states.",
    metaTitle: "State and Local Tax (SALT) Services",
    metaDescription:
      "Nexus studies, state income and franchise tax, sales and use tax compliance, voluntary disclosure agreements and credits and incentives.",
    hero: {
      title: "Know where you owe before the states tell you.",
      intro: [
        "Since the Supreme Court's 2018 Wayfair decision, a company can owe sales tax in a state where it has no office and no staff, simply because it sells there. Remote employees create income tax and payroll questions in still more states.",
        "We work out where you have obligations, bring you into compliance on terms that limit penalties, and keep the filings current as you grow.",
      ],
      photo: "deskBinders",
    },
    offers: [
      {
        title: "Exposure and compliance",
        body: "Find the obligations, then meet them.",
        items: [
          "Nexus studies for income and sales tax",
          "Voluntary disclosure agreements",
          "State income and franchise tax returns",
          "Sales and use tax compliance and audits",
          "Gross receipts taxes, including the Texas franchise tax",
        ],
      },
      {
        title: "Planning and incentives",
        body: "Reduce what you owe within the rules.",
        items: [
          "State apportionment and filing methods",
          "Credits and incentives for hiring and investment",
          "Property tax reviews",
          "State tax diligence for transactions",
        ],
      },
    ],
    topic: "tax",
    related: ["/tax/federal-tax", "/tax/international-tax", "/industries/technology"],
  },
  {
    practice: "tax",
    slug: "international-tax",
    name: "International tax",
    summary: "Cross-border structuring, transfer pricing, foreign reporting and the global minimum tax.",
    metaTitle: "International Tax Services",
    metaDescription:
      "International tax planning and compliance: inbound and outbound structuring, transfer pricing, foreign information returns, withholding and the global minimum tax.",
    hero: {
      title: "Cross-border tax for companies that operate in more than one country.",
      intro: [
        "Selling, hiring or owning entities abroad brings tax rules from at least two countries into play, plus the US rules on foreign income. The penalties for missing a foreign information return can exceed the tax itself.",
        "We help US companies going abroad and foreign companies coming to the United States structure their operations, price transactions between related entities and file what each country requires.",
      ],
      photo: "newYorkRiver",
    },
    offers: [
      {
        title: "Structuring and planning",
        body: "Decisions to make before you expand.",
        items: [
          "Inbound structuring for foreign companies entering the US",
          "Outbound structuring for US companies expanding abroad",
          "US rules on income of controlled foreign corporations",
          "Global minimum tax (Pillar Two) impact assessments",
          "Tax treaty analysis",
        ],
      },
      {
        title: "Compliance",
        body: "The filings that carry heavy penalties when missed.",
        items: [
          "Foreign information returns, including Forms 5471, 5472, 8858 and 8865",
          "Transfer pricing documentation and policies",
          "Withholding on payments to foreign persons",
          "FBAR and FATCA reporting",
        ],
      },
    ],
    topic: "tax",
    related: ["/tax/federal-tax", "/tax/state-and-local-tax", "/advisory/transaction-advisory"],
  },
];

export function servicePath(s: Pick<Service, "practice" | "slug">): string {
  return `/${s.practice}/${s.slug}`;
}

export function servicesFor(practice: PracticeId): Service[] {
  return services.filter((s) => s.practice === practice);
}

export function getService(practice: PracticeId, slug: string): Service | undefined {
  return services.find((s) => s.practice === practice && s.slug === slug);
}

/** Looks up a service, practice or other page title by path, for related links. */
export function serviceByPath(path: string): Service | undefined {
  return services.find((s) => servicePath(s) === path);
}
