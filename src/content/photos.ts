import type { StaticImageData } from "next/image";
import capitolDome from "@/assets/photos/capitol-dome.jpg";
import strategyConversation from "@/assets/photos/strategy-conversation.jpg";
import chartReview from "@/assets/photos/chart-review.jpg";
import dallasSunset from "@/assets/photos/dallas-sunset.jpg";
import documentReview from "@/assets/photos/document-review.jpg";
import deskBinders from "@/assets/photos/desk-binders.jpg";
import evidenceBinders from "@/assets/photos/evidence-binders.jpg";
import factoryFloor from "@/assets/photos/factory-floor.jpg";
import glassTower from "@/assets/photos/glass-tower.jpg";
import hospitalCorridor from "@/assets/photos/hospital-corridor.jpg";
import newYorkDusk from "@/assets/photos/new-york-dusk.jpg";
import newYorkRiver from "@/assets/photos/new-york-river.jpg";
import officeTeam from "@/assets/photos/office-team.jpg";
import partnersMeeting from "@/assets/photos/partners-meeting.jpg";
import serverHall from "@/assets/photos/server-hall.jpg";
import stockExchange from "@/assets/photos/stock-exchange.jpg";
import taxForms from "@/assets/photos/tax-forms.jpg";
import teamLaptop from "@/assets/photos/team-laptop.jpg";
import volunteers from "@/assets/photos/volunteers.jpg";
import windFarmSunset from "@/assets/photos/wind-farm-sunset.jpg";
import workingSession from "@/assets/photos/working-session.jpg";

/**
 * Every photograph on the site, with its alt text. Sources and photographers are
 * listed in docs/PHOTO_CREDITS.md. These are licensed stock images: none of them
 * shows Vantremont staff, offices or clients, and the copy never says they do.
 */
export const photos = {
  workingSession: { src: workingSession, alt: "People around a table reviewing printed documents and taking notes" },
  documentReview: { src: documentReview, alt: "Two people reviewing a printed report at a desk" },
  evidenceBinders: {
    src: evidenceBinders,
    alt: "A stack of thick ring binders on a white surface",
    position: "88% 50%",
  },
  deskBinders: { src: deskBinders, alt: "A desk with a calculator, printed charts and colored binders" },
  taxForms: { src: taxForms, alt: "Hands holding tax forms beside a calculator and a laptop" },
  strategyConversation: {
    src: strategyConversation,
    alt: "A person explaining a point across a table, with an open laptop",
  },
  officeTeam: { src: officeTeam, alt: "A team working together around desks in a bright office" },
  teamLaptop: { src: teamLaptop, alt: "Colleagues leaning over a laptop to look at the same screen" },
  partnersMeeting: { src: partnersMeeting, alt: "Colleagues in a meeting at a long table in an office" },
  chartReview: { src: chartReview, alt: "Two people discussing charts on a laptop" },
  serverHall: { src: serverHall, alt: "Rows of server cabinets in a data center" },
  stockExchange: { src: stockExchange, alt: "The New York Stock Exchange building with American flags" },
  hospitalCorridor: { src: hospitalCorridor, alt: "A quiet hospital corridor with benches and doors" },
  factoryFloor: { src: factoryFloor, alt: "Engineers working on an automotive production line" },
  windFarmSunset: { src: windFarmSunset, alt: "Wind turbines on open farmland at sunset" },
  capitolDome: { src: capitolDome, alt: "The dome of the United States Capitol" },
  volunteers: { src: volunteers, alt: "Volunteers organizing donated goods under a tent" },
  dallasSunset: { src: dallasSunset, alt: "Downtown Dallas towers at sunset" },
  newYorkDusk: { src: newYorkDusk, alt: "The Manhattan skyline at dusk seen across the river" },
  newYorkRiver: { src: newYorkRiver, alt: "Manhattan skyscrapers seen from across the Hudson River" },
  glassTower: { src: glassTower, alt: "Looking up at a glass office tower between two buildings" },
} satisfies Record<string, { src: StaticImageData; alt: string; position?: string }>;

/** Where to anchor a photograph when it is cropped. Defaults to the center. */
export function focalPoint(key: keyof typeof photos): string | undefined {
  const p = photos[key];
  return "position" in p ? p.position : undefined;
}

export type PhotoKey = keyof typeof photos;
