/**
 * Registered member firms.
 *
 * Only publish facts the member has confirmed in writing: locations, services and
 * accreditations. Accreditations must name the accreditation body and the scope, and
 * should be checkable in that body's public directory. A location with
 * `confirmed: false` is kept here for reference but never shown on the site.
 */

export type ServiceArea = "Advisory" | "Cyber and risk" | "Audit and assurance" | "Certification" | "Tax";

export type Location = {
  country: string;
  countryName: string;
  /** US state code, used to shade the member network map. */
  region?: string;
  regionName?: string;
  city?: string;
  confirmed: boolean;
};

export type Accreditation = {
  name: string;
  /** The accreditation or licensing body, for example ANAB or a state board of accountancy. */
  body: string;
  scope?: string;
  verifyUrl?: string;
};

export type Member = {
  slug: string;
  name: string;
  legalName: string;
  /** Short description of what kind of firm it is. */
  kind: string;
  /** True for a slot that is waiting for real details. Never shown on the live site. */
  placeholder?: boolean;
  summary: string;
  overview: string[];
  areas: ServiceArea[];
  services: string[];
  locations: Location[];
  accreditations: Accreditation[];
  /** Shown when there are no accreditations, so the profile is never misleading by omission. */
  accreditationNote?: string;
  website?: string;
  email?: string;
  /** Vantremont services this member delivers or supports. */
  vantremontServices: string[];
};

/** Shown on profiles with no firm-level accreditations listed, so nothing is implied by omission. */
const NO_FIRM_ACCREDITATIONS =
  "This firm has not listed any firm-level accreditations on its Vantremont profile. Its consultants hold their own individual professional certifications.";

export const members: Member[] = [
  {
    slug: "silver-fox",
    name: "Silver Fox",
    legalName: "Silver Fox LLC",
    kind: "Cybersecurity consulting",
    summary:
      "A Texas cybersecurity consulting firm. Penetration testing, compliance readiness, managed detection and response, and incident response.",
    overview: [
      "Silver Fox is a cybersecurity consulting firm based in Texas. It runs penetration tests and red team exercises, prepares companies for CMMC, SOC 2 and HIPAA, and helps security teams detect and respond to attacks.",
      "Within the Vantremont network, Silver Fox delivers the technical security work behind our cyber and risk advisory, and the cyber side of transaction due diligence.",
    ],
    areas: ["Cyber and risk", "Advisory"],
    services: [
      "Cyber strategy, risk and compliance",
      "Penetration testing and offensive security",
      "Cloud, application and infrastructure security",
      "Identity and data security",
      "Managed detection and response",
      "Incident response and digital forensics",
    ],
    locations: [
      { country: "US", countryName: "United States", region: "TX", regionName: "Texas", confirmed: true },
      // Related operation in Pakistan. Shown only once the owner confirms it.
      { country: "PK", countryName: "Pakistan", confirmed: false }, // LAUNCH-CONFIRM: Silver Fox operation in Pakistan, city, and whether to list it
    ],
    accreditations: [],
    accreditationNote:
      "Silver Fox prepares organizations for assessments and certifications. It is not a certification body, a CMMC C3PAO or a CPA firm, and it does not issue certificates or attestation reports.",
    website: "https://silver-fox-consulting.us",
    email: "contact@silver-fox-consulting.us",
    vantremontServices: [
      "/advisory/cyber-and-risk",
      "/advisory/transaction-advisory",
      "/advisory/certification-and-compliance",
    ],
  },
  {
    slug: "praetorian",
    name: "Praetorian",
    legalName: "Praetorian",
    kind: "Offensive security",
    summary:
      "An Austin offensive security company. Adversary emulation, continuous threat exposure management and penetration testing.",
    overview: [
      "Praetorian is an offensive security company headquartered in Austin, Texas, founded in 2010. Its engineers test systems the way attackers would, to find exploitable weaknesses before someone else does, and help clients put security spending where it removes the most risk.",
      "Its Praetorian Guard platform pairs automated discovery with engineers who confirm which findings can really be exploited and guide the fix.",
    ],
    areas: ["Cyber and risk"],
    services: [
      "Adversary emulation and red team exercises",
      "Continuous threat exposure management",
      "Application, cloud and network penetration testing",
      "Attack surface discovery and testing",
    ],
    locations: [
      {
        country: "US",
        countryName: "United States",
        region: "TX",
        regionName: "Texas",
        city: "Austin",
        confirmed: true,
      },
    ],
    accreditations: [],
    accreditationNote: NO_FIRM_ACCREDITATIONS,
    website: "https://www.praetorian.com",
    vantremontServices: ["/advisory/cyber-and-risk"],
  },
  {
    slug: "raxis",
    name: "Raxis",
    legalName: "Raxis LLC",
    kind: "Penetration testing",
    summary:
      "An Atlanta penetration testing firm. Manual testing of applications, networks and cloud, red team work and social engineering.",
    overview: [
      "Raxis is a penetration testing firm based in Atlanta, Georgia, founded in 2011. Its testing is done by hand by engineers based in the United States, either as a one-time test or as an ongoing testing service.",
      "Its work covers web, API and mobile applications, AI and large language model applications, internal and external networks, Active Directory, cloud, wireless and operational technology.",
    ],
    areas: ["Cyber and risk"],
    services: [
      "Point-in-time and ongoing penetration testing",
      "Red team and purple team exercises",
      "Web, API, mobile and AI application testing",
      "Network, cloud, wireless and OT testing",
      "Phishing, vishing and physical social engineering",
      "Incident response and tabletop exercises",
    ],
    locations: [
      {
        country: "US",
        countryName: "United States",
        region: "GA",
        regionName: "Georgia",
        city: "Atlanta",
        confirmed: true,
      },
    ],
    accreditations: [],
    accreditationNote: NO_FIRM_ACCREDITATIONS,
    website: "https://raxis.com",
    vantremontServices: ["/advisory/cyber-and-risk"],
  },
  {
    slug: "black-hills-information-security",
    name: "Black Hills Information Security",
    legalName: "Black Hills Information Security",
    kind: "Security testing and operations",
    summary:
      "A South Dakota security firm. Penetration testing, a managed security operations service, incident response and compliance work.",
    overview: [
      "Black Hills Information Security is based in Sturgis, South Dakota, and has worked with clients since 2008. Its core work is penetration testing, and it publishes free training and research for the security community.",
      "Beyond testing, it runs a managed security operations service, responds to incidents and helps clients with governance, risk and compliance.",
    ],
    areas: ["Cyber and risk"],
    services: [
      "Penetration testing and continuous penetration testing",
      "Web application testing",
      "AI security assessments",
      "Managed security operations (ActiveSOC)",
      "Incident response",
      "Governance, risk and compliance",
    ],
    locations: [
      {
        country: "US",
        countryName: "United States",
        region: "SD",
        regionName: "South Dakota",
        city: "Sturgis",
        confirmed: true,
      },
    ],
    accreditations: [],
    accreditationNote: NO_FIRM_ACCREDITATIONS,
    website: "https://www.blackhillsinfosec.com",
    vantremontServices: ["/advisory/cyber-and-risk"],
  },
  {
    slug: "trustedsec",
    name: "TrustedSec",
    legalName: "TrustedSec",
    kind: "Cybersecurity consulting",
    summary:
      "An Ohio cybersecurity consulting firm. Penetration testing, adversary simulation, incident response and AI security.",
    overview: [
      "TrustedSec is a cybersecurity consulting firm based in Fairlawn, Ohio, founded in 2012. It tests, builds and hardens security programs for companies and public agencies, and publishes research and open source tools used across the industry.",
      "It holds CREST accreditation for penetration testing, which means its testing methods, data handling and staff qualifications have been assessed by CREST.",
    ],
    areas: ["Cyber and risk", "Advisory"],
    services: [
      "Penetration testing and adversary simulation",
      "Incident response",
      "AI security: testing AI systems and governing their use",
      "Security program strategy and assessments",
    ],
    locations: [
      {
        country: "US",
        countryName: "United States",
        region: "OH",
        regionName: "Ohio",
        city: "Fairlawn",
        confirmed: true,
      },
    ],
    accreditations: [
      // LAUNCH-CONFIRM: TrustedSec to confirm its CREST accreditation is current
      {
        name: "CREST accredited: Penetration Testing",
        body: "CREST",
        verifyUrl: "https://marketplace.crest.org",
      },
    ],
    website: "https://trustedsec.com",
    vantremontServices: ["/advisory/cyber-and-risk"],
  },
  {
    slug: "bishop-fox",
    name: "Bishop Fox",
    legalName: "Bishop Fox",
    kind: "Offensive security",
    summary:
      "An Arizona offensive security firm. Application, cloud and hardware testing, continuous testing, red team work and AI security.",
    overview: [
      "Bishop Fox is an offensive security firm headquartered in Tempe, Arizona, working since 2005. It describes itself as the largest private professional services firm focused on offensive security testing.",
      "It tests applications, cloud environments, networks and hardware, runs red team exercises, and offers continuous testing of a client's external attack surface through its Cosmos platform.",
    ],
    areas: ["Cyber and risk"],
    services: [
      "Application, mobile and secure code review",
      "Cloud, network and hardware penetration testing",
      "AI security testing",
      "Continuous attack surface testing",
      "Red team exercises and social engineering",
      "Ransomware readiness and incident response tabletops",
    ],
    locations: [
      {
        country: "US",
        countryName: "United States",
        region: "AZ",
        regionName: "Arizona",
        city: "Tempe",
        confirmed: true,
      },
    ],
    accreditations: [],
    accreditationNote: NO_FIRM_ACCREDITATIONS,
    website: "https://bishopfox.com",
    vantremontServices: ["/advisory/cyber-and-risk"],
  },
  {
    slug: "expel",
    name: "Expel",
    legalName: "Expel, Inc.",
    kind: "Managed detection and response",
    summary:
      "A Virginia managed detection and response provider. Around-the-clock monitoring, managed SIEM, phishing response and threat hunting.",
    overview: [
      "Expel is a managed detection and response provider headquartered in Herndon, Virginia. Its analysts watch a client's cloud, endpoint and network alerts around the clock, investigate them and tell the client what to do, or act directly.",
      "It runs its service on its own operations platform, which connects to the security tools a client already uses.",
    ],
    areas: ["Cyber and risk"],
    services: [
      "Managed detection and response",
      "Managed SIEM",
      "Phishing investigation and response",
      "Threat hunting",
    ],
    locations: [
      {
        country: "US",
        countryName: "United States",
        region: "VA",
        regionName: "Virginia",
        city: "Herndon",
        confirmed: true,
      },
    ],
    accreditations: [],
    accreditationNote: NO_FIRM_ACCREDITATIONS,
    website: "https://expel.com",
    vantremontServices: ["/advisory/cyber-and-risk"],
  },
  {
    slug: "netspi",
    name: "NetSPI",
    legalName: "NetSPI LLC",
    kind: "Penetration testing and attack surface management",
    summary:
      "A Minneapolis security testing company. Penetration testing as a service, red team work and attack surface management.",
    overview: [
      "NetSPI is a security testing company headquartered in Minneapolis, Minnesota, working since 2001. It delivers penetration testing as an ongoing service, with results tracked in its own platform rather than a one-time report.",
      "It tests applications, cloud, networks, mainframes, AI and machine learning systems, and hardware such as medical, automotive and industrial devices, and monitors a client's external attack surface.",
    ],
    areas: ["Cyber and risk"],
    services: [
      "Penetration testing as a service",
      "Application, cloud, network and mainframe testing",
      "AI and machine learning testing",
      "Hardware, IoT and OT testing",
      "Red team operations and social engineering",
      "Attack surface management",
    ],
    locations: [
      {
        country: "US",
        countryName: "United States",
        region: "MN",
        regionName: "Minnesota",
        city: "Minneapolis",
        confirmed: true,
      },
    ],
    accreditations: [],
    accreditationNote: NO_FIRM_ACCREDITATIONS,
    website: "https://www.netspi.com",
    vantremontServices: ["/advisory/cyber-and-risk"],
  },
  {
    slug: "coalfire",
    name: "Coalfire",
    legalName: "Coalfire Systems, Inc.",
    kind: "Cybersecurity advisory and assessment",
    summary:
      "A Chicago cybersecurity firm. Compliance assessments, FedRAMP and CMMC advisory, cloud security engineering and offensive security.",
    overview: [
      "Coalfire is a cybersecurity advisory and assessment firm headquartered in Chicago, Illinois. It advises on and assesses compliance with a wide range of frameworks, including FedRAMP, PCI DSS, HITRUST and ISO/IEC 42001, and engineers cloud environments to meet them.",
      "It is a FedRAMP Third Party Assessment Organization and a PCI Qualified Security Assessor company. Its affiliate, Coalfire Federal, is an authorized CMMC Third-Party Assessment Organization (C3PAO).",
      "Because Coalfire both advises and assesses, Vantremont applies its independence rules: Coalfire will not assess a system that Vantremont or another member firm advised the same client on.",
    ],
    areas: ["Cyber and risk", "Advisory"],
    services: [
      "FedRAMP and CMMC advisory",
      "Compliance assessments across more than 85 frameworks",
      "PCI DSS assessments",
      "Cloud security engineering",
      "Offensive and defensive security services",
      "Healthcare risk and compliance",
    ],
    locations: [
      {
        country: "US",
        countryName: "United States",
        region: "IL",
        regionName: "Illinois",
        city: "Chicago",
        confirmed: true,
      },
    ],
    accreditations: [
      // LAUNCH-CONFIRM: Coalfire to confirm its FedRAMP 3PAO and PCI QSA status are current
      {
        name: "FedRAMP Third Party Assessment Organization (3PAO)",
        body: "the FedRAMP program",
        verifyUrl: "https://marketplace.fedramp.gov/assessors",
      },
      {
        name: "PCI Qualified Security Assessor (QSA) company",
        body: "the PCI Security Standards Council",
        verifyUrl: "https://www.pcisecuritystandards.org/assessors_and_solutions/qualified_security_assessors",
      },
    ],
    website: "https://coalfire.com",
    vantremontServices: ["/advisory/cyber-and-risk", "/advisory/certification-and-compliance"],
  },
  {
    slug: "guidepoint-security",
    name: "GuidePoint Security",
    legalName: "GuidePoint Security LLC",
    kind: "Cybersecurity consulting and managed services",
    summary:
      "A Virginia cybersecurity firm. Consulting, engineering and managed security across cloud, identity, applications and compliance.",
    overview: [
      "GuidePoint Security is a cybersecurity consulting, engineering and managed services firm headquartered in Reston, Virginia. It works with commercial companies and federal agencies, and helps clients choose and deploy security technology.",
      "Its consultants cover most areas of a security program, from penetration testing and incident response to identity, cloud, data security and governance, risk and compliance.",
    ],
    areas: ["Cyber and risk", "Advisory"],
    services: [
      "Governance, risk and compliance",
      "Penetration testing and vulnerability management",
      "Incident response and threat intelligence",
      "Cloud, application and data security",
      "Identity and access management",
      "Managed security and security operations center services",
    ],
    locations: [
      {
        country: "US",
        countryName: "United States",
        region: "VA",
        regionName: "Virginia",
        city: "Reston",
        confirmed: true,
      },
    ],
    accreditations: [],
    accreditationNote: NO_FIRM_ACCREDITATIONS,
    website: "https://www.guidepointsecurity.com",
    vantremontServices: ["/advisory/cyber-and-risk"],
  },
  {
    slug: "optiv",
    name: "Optiv",
    legalName: "Optiv Security Inc.",
    kind: "Cybersecurity services and solutions",
    summary:
      "A Kansas cybersecurity firm. Security advisory, technology integration, managed security and attack and penetration testing.",
    overview: [
      "Optiv is a cybersecurity services and solutions provider with its corporate headquarters in Leawood, Kansas. It advises on security strategy, designs and integrates security technology, and runs managed security services.",
      "Its practices cover risk and privacy, identity, data protection, cloud and application security, detection and response, and attack and penetration testing.",
    ],
    areas: ["Cyber and risk", "Advisory"],
    services: [
      "Security strategy, risk and privacy",
      "Identity and data security",
      "Infrastructure and cloud security",
      "Application security",
      "Managed security services and detection and response",
      "Attack and penetration testing",
    ],
    locations: [
      {
        country: "US",
        countryName: "United States",
        region: "KS",
        regionName: "Kansas",
        city: "Leawood",
        confirmed: true,
      },
    ],
    accreditations: [],
    accreditationNote: NO_FIRM_ACCREDITATIONS,
    website: "https://www.optiv.com",
    vantremontServices: ["/advisory/cyber-and-risk"],
  },
];

export function getMember(slug: string): Member | undefined {
  return members.find((m) => m.slug === slug);
}

export function shownLocations(m: Member): Location[] {
  return m.locations.filter((l) => l.confirmed);
}

/** Every confirmed location across the network, for the map and the filters. */
export function networkLocations(): (Location & { member: Member })[] {
  return members.flatMap((m) => shownLocations(m).map((l) => ({ ...l, member: m })));
}

export const SERVICE_AREAS: ServiceArea[] = [
  "Advisory",
  "Cyber and risk",
  "Audit and assurance",
  "Certification",
  "Tax",
];
