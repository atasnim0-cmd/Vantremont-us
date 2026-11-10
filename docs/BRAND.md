# Vantremont brand

Proposed in November 2026 under the owner's "propose and create" approval. Everything here can change once the owner reviews it; the palette lives in `src/app/globals.css` and the logo in `src/components/brand/Logo.tsx` and `public/brand/`.

## Logo

The mark is a V drawn as two converging strokes. The tops of both strokes are cut along the flanks of a peak that sits above and to the right of the letter, so the V also reads as a summit: vantage and mont. The right stroke rises higher than the left, which gives the mark its direction.

- One flat color. Claret on light grounds, ivory on dark grounds. Never two colors, never a gradient, never an outline.
- The wordmark is Newsreader Medium in capitals, tracked 0.2 em, converted to outlines so it looks the same everywhere.
- Minimum size: 16 px for the mark alone (the favicon), 120 px wide for the full lockup.
- Clear space: at least the width of one stroke on every side.

| File                                                | Use                                                        |
| --------------------------------------------------- | ---------------------------------------------------------- |
| `public/brand/vantremont-logo.svg`                  | Lockup, claret mark and ink wordmark, for light grounds    |
| `public/brand/vantremont-logo-reversed.svg`         | Lockup in ivory, for dark grounds                          |
| `public/brand/vantremont-mark.svg`                  | Mark alone, claret                                         |
| `public/brand/vantremont-mark-ivory.svg`            | Mark alone, ivory                                          |
| `public/brand/vantremont-mark.png`                  | 512 px PNG of the mark, used in structured data            |
| `src/app/icon.svg`, `favicon.ico`, `apple-icon.png` | Browser and home screen icons: ivory mark on a claret tile |
| `src/app/opengraph-image.tsx`                       | Share image, generated at build time                       |

## Color

Flat color only. No gradients, no purple or violet, no green as a brand color.

| Name        | Hex       | Use                                                           |
| ----------- | --------- | ------------------------------------------------------------- |
| Claret      | `#7A1F2B` | Brand color, primary buttons, links, accents on light grounds |
| Deep claret | `#5A1520` | Hover states                                                  |
| Ink         | `#14110F` | Headings, dark bands, footer                                  |
| Ivory       | `#F7F3EC` | Page ground                                                   |
| Sand        | `#EFE8DC` | Quiet alternate ground                                        |
| Paper       | `#FFFFFF` | Cards and alternate sections                                  |
| Stone       | `#E4DDD1` | Hairlines                                                     |
| Slate       | `#5E6470` | Secondary text                                                |
| Rose        | `#E9B7BD` | Accents and labels on ink                                     |
| Brass       | `#A9875A` | Very small details on ink only                                |

Contrast (WCAG 2): ink on ivory 17:1, body text `#3B3732` on ivory 10.7:1, claret on ivory 9.2:1, slate on ivory 5.4:1, ivory on claret 9.2:1, rose on ink 10.7:1. Brass on ivory is only 3:1, so it never carries text on light grounds.

Fallback palettes if the owner does not like claret: Graphite and Saffron (`#23262B` with `#D9A23A`), or Ink and Cobalt (avoid if it looks too close to Silver Fox navy).

## Type

- **Newsreader** for headings, in its display optical size at weight 400 with slight negative tracking. Only that one cut is loaded (a 37 KB file). Claret is used for one emphasized phrase at most per page. The italic is not loaded, to keep the page light.
- **Hanken Grotesk** for body text, labels and interface.
- Labels above sections are small capitals with a running number (`01 What we do`), like the running heads in a printed report. One per section.

## Layout and motion

- Hairline rules and numbered sections instead of boxes and shadows. Square corners (3 px on buttons and inputs).
- One section per screen. Photography leads; the only diagrams are the certification pathway and the member map.
- Motion carries meaning only: 2 px lift on linked cards, 1.03 photo zoom, button press, sliding underlines, and the certification pathway drawing itself on wide screens (with a pause button). Nothing fades in on scroll. Everything rests under reduced motion.
