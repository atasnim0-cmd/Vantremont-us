import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Vantremont: advisory, audit and assurance, and tax";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The fonts do not depend on the request, so they are read once at module scope and
// the image is prerendered at build time.
const FONTS = join(process.cwd(), "src/assets/fonts");
const serif = await readFile(join(FONTS, "Newsreader-Display-Regular.ttf"));
const sans = await readFile(join(FONTS, "HankenGrotesk-SemiBold.ttf"));

const MARK = ["M2.5 10.6 8.7 5.9 16 30.2h-2.7Z", "M23.3 1.8 29.5 6.1 18.7 30.2H16Z"];

/** Default share image used by every page. Flat ivory and claret, set in the site's own typefaces. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        background: "#f7f3ec",
        color: "#14110f",
        fontFamily: "Hanken",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="60" height="60" viewBox="0 0 32 32" fill="#7a1f2b">
          {MARK.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
        <div style={{ display: "flex", fontFamily: "Newsreader", fontSize: 34, letterSpacing: 7 }}>VANTREMONT</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontFamily: "Newsreader",
            fontSize: 76,
            lineHeight: 1.04,
            maxWidth: 1000,
            letterSpacing: -1,
          }}
        >
          Advisory, audit and tax for companies that have to prove it.
        </div>
        <div style={{ display: "flex", marginTop: 30, fontSize: 26, color: "#5e6470" }}>
          Certification readiness, assurance and tax, in the United States and abroad.
        </div>
      </div>
      <div style={{ display: "flex", height: 8, width: "100%", background: "#7a1f2b" }} />
    </div>,
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: serif, weight: 400, style: "normal" },
        { name: "Hanken", data: sans, weight: 600, style: "normal" },
      ],
    },
  );
}
