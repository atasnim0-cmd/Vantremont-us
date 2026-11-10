/**
 * Company details used across the whole site.
 *
 * Every value marked LAUNCH-PLACEHOLDER is a stand-in and every value marked
 * LAUNCH-CONFIRM is a statement the owner has to confirm. `npm run check:launch`
 * fails the production build on the live domain until all of them are resolved.
 */

export const site = {
  name: "Vantremont",
  legalName: "Vantremont", // LAUNCH-PLACEHOLDER: full legal entity name, for example "Vantremont LLC"
  url: "https://vantremont.com",
  description:
    "Vantremont is a professional services firm and network of independent member firms. We provide advisory, audit and assurance, and tax services, and we help companies in the United States and abroad prepare for certification and compliance audits.",

  email: {
    general: "contact@vantremont.com", // LAUNCH-CONFIRM: mailbox exists
    rfp: "rfp@vantremont.com", // LAUNCH-CONFIRM: mailbox exists
    careers: "careers@vantremont.com", // LAUNCH-CONFIRM: mailbox exists
    network: "network@vantremont.com", // LAUNCH-CONFIRM: mailbox exists
    privacy: "privacy@vantremont.com", // LAUNCH-CONFIRM: mailbox exists
    security: "security@vantremont.com", // LAUNCH-CONFIRM: mailbox exists
  },

  /** Main phone line. Set `show` to false to hide it everywhere. */
  phone: {
    show: false, // LAUNCH-PLACEHOLDER: add a real number and set show to true, or leave hidden
    display: "",
    tel: "",
  },

  /**
   * Headquarters. Only the city and state are shown until a street address is
   * confirmed. Leave `city` empty to hide the line entirely.
   */
  office: {
    city: "", // LAUNCH-PLACEHOLDER: headquarters city
    region: "", // LAUNCH-PLACEHOLDER: headquarters state, for example "TX"
    country: "US",
  },

  hours: "Monday through Friday, 9 a.m. to 5 p.m. Central", // LAUNCH-CONFIRM: business hours

  social: {
    linkedin: "", // Leave empty to hide the link.
  },

  copyrightStartYear: 2026,

  /** Shown on the Privacy Policy, Terms, Legal and Accessibility pages. Update whenever they change. */
  legalLastUpdated: "November 5, 2026",
} as const;

/**
 * Licensing and attest statements. Until the owner confirms that Vantremont (or a
 * named member) is a licensed CPA firm, attest services are described as delivered
 * through licensed member firms, and the disclosure below appears in the footer and
 * on the Legal page.
 */
export const licensing = {
  /** True once Vantremont itself holds a CPA firm license for attest work. */
  vantremontIsCpaFirm: false, // LAUNCH-CONFIRM: is Vantremont a licensed CPA firm? Who signs audit and SOC reports?
  attestDisclosure:
    "Vantremont is not a licensed CPA firm. Financial statement audits, SOC examinations and other attest services are performed and signed by independent, licensed CPA firms in the Vantremont network, which take sole responsibility for them.",
  networkDisclaimer:
    "Vantremont refers to Vantremont and to the network of independent member firms listed on this site. Each member firm is a separate legal entity, responsible only for its own acts and omissions and for the services it delivers. Vantremont does not provide services to clients on behalf of member firms, and member firms do not act on behalf of Vantremont or of one another, unless a written agreement says so.",
  certificationIndependence:
    "Advisory and certification for the same client are kept separate within the network. If a Vantremont firm advises a client on a management system, no member certification body certifies that client for the same system.",
} as const;
