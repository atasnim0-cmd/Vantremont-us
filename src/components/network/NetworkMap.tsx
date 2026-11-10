import { networkLocations } from "@/content/members";
import { US_STATES, US_VIEWBOX } from "@/content/us-map";

/**
 * Map of the states where member firms are based, drawn from confirmed member
 * locations only. It names states, never firms: the directory is search-only, so the
 * map must not list the members either.
 *
 * The base map of all states is a static SVG file in public/maps (so its path data is
 * cached and never repeated in the page HTML); only the highlighted states are drawn
 * inline on top. Locations outside the United States are listed under the map rather
 * than placed on a world map, so the network is never drawn bigger than it is.
 */
/** "A, B and C", with no serial comma. */
const list = (items: string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

export function NetworkMap({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const locations = networkLocations();
  const regions = [
    ...new Set(locations.filter((l) => l.country === "US" && l.region && US_STATES[l.region]).map((l) => l.region!)),
  ].sort((a, b) => US_STATES[a].name.localeCompare(US_STATES[b].name));
  const abroad = [...new Set(locations.filter((l) => l.country !== "US").map((l) => l.countryName))];

  const stateNames = regions.map((r) => US_STATES[r].name);
  const label = "Map of the United States with the states where member firms are based shaded.";

  const accent = dark ? "#e9b7bd" : "#7a1f2b";
  const ground = dark ? "#14110f" : "#f7f3ec";

  return (
    <figure>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element -- static vector file, no optimization needed */}
        <img
          src={dark ? "/maps/us-states-dark.svg" : "/maps/us-states-light.svg"}
          alt=""
          width={975}
          height={610}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
        <svg viewBox={US_VIEWBOX} role="img" aria-label={label} className="absolute inset-0 h-full w-full">
          {regions.map((region) => {
            const s = US_STATES[region];
            const [cx, cy] = s.c;
            return (
              <g key={region}>
                <path d={s.d} fill={accent} stroke={ground} strokeWidth="1" />
                <circle cx={cx} cy={cy} r="7" fill={ground} />
                <circle cx={cx} cy={cy} r="3.5" fill={accent} />
              </g>
            );
          })}
        </svg>
      </div>
      {regions.length > 0 && (
        <figcaption
          className={dark ? "mt-4 text-sm leading-relaxed text-fog" : "mt-4 text-sm leading-relaxed text-slate"}
        >
          Member firms are based in {list(stateNames)}
          {abroad.length > 0 ? `, and outside the United States in ${list(abroad)}` : ""}.
        </figcaption>
      )}
    </figure>
  );
}
