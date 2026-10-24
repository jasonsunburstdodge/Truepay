# TruePay design system

Source: Jason's ChatGPT build of the TruePay partner-opportunities page. That page is the visual standard for every page on the site. Do not use a serif font, warm off-white backgrounds or the WordPress dev site's styling.

## Feel

Confident, modern fintech with a Texas handshake. The page uses deep navy, a single gold accent, cool blue-gray surfaces, white cards with large rounded corners, and very heavy, tightly tracked headlines.

## Tokens (use as CSS variables in `src/app/globals.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--color-navy-deep` | `#07274b` | Sticky header bar, mobile CTA bar |
| `--color-navy-night` | `#042243` | Dark section bands ("Find your fit"), footer, form band |
| `--color-hero-from` / `--color-hero-via` / `--color-hero-to` | `#0b3360` / `#134171` / `#082d54` | Hero gradient: vertical from→to, with a radial glow of `via` at the top right |
| `--color-navy` | `#092f59` | Dark result cards, selected chips, avatars |
| `--color-ink` | `#0c2b4f` | Headlines and big numbers on light backgrounds |
| `--color-text` | `#23395a` | Body text on light |
| `--color-text-muted` | `#5a6e87` | Secondary text, notes |
| `--color-slate` | `#4a6382` | Eyebrows on light, labels in stat rows |
| `--color-mist` | `#c6d3e2` | Body text on navy |
| `--color-gold` | `#e4b661` | Primary buttons, eyebrows on navy, shield logo, accents |
| `--color-gold-bright` | `#edc57b` | Primary button hover |
| `--color-page` | `#f4f7fa` | Page background |
| `--color-surface` | `#e3eaf1` | Light section bands (calculators, steps, quotes) |
| `--color-surface-alt` | `#f1f5f9` | Light result cards, unselected chips |
| `--color-paper` | `#ffffff` | Cards |
| `--color-border` | `#d5dfe9` | Dividers, input borders |
| Radius | 24px cards · 16px inner panels · 10px buttons/inputs | |
| Shadow | `0 10px 30px rgba(7,39,75,.08)` on cards | |

## Typography

- One family: **Inter** (self-hosted variable font).
- **Headlines:** weight 800, letter-spacing −0.04em, line-height 1.05. The hero H1 goes to −0.055em and line-height 0.98, and is huge (about 44px on a phone, 72px on desktop).
- **Eyebrows:** 12–13px, weight 700, uppercase, letter-spacing 0.22em. Gold on navy; slate on light.
- **Body:** 17–20px on heroes (mist color), 16–17px elsewhere, line-height 1.6.
- **Big numbers** (50%, $500–$875, 2.64%): weight 800, letter-spacing −0.05em, 48–64px.
- **Logo wordmark:** gold outlined shield with a check, then "True" (weight 800) and "pay" (weight 300, lowercase), white on the navy header.

## Components

- **Header:** sticky, navy-deep, logo left, white nav, outlined white button right ("Free statement review"; the partner page used "Connect with us").
- **Hero:** gradient plus 2–3 very faint concentric circle arcs (white, 7–8% opacity strokes, two filled at about 2%). Gold eyebrow, huge H1, mist paragraph, then a gold primary button (navy text, 10px radius, bold) and an outlined white secondary button.
- **Overlap card:** a white 24px-radius card pulled up into the bottom of the hero, with a slate eyebrow, an ink headline and label/value rows separated by hairlines. Example: "Sales reps … 50%".
- **Dark band:** navy-night section with a gold eyebrow, white headline and mist body ("Find your fit / Know the owners. Make the connection.").
- **Light band:** surface background holding white cards.
- **Calculators:** large `$` input with a 2px border and a 32–36px bold number; preset chips; a navy result card (white big number) next to a light result card (ink big number); a gray note underneath.
- **Cards:** white, 24px radius, soft shadow, no visible border. Titles in 20px weight 800.
- **CTA band:** hero gradient with arcs, gold eyebrow, white headline, gold and outlined buttons.
- **Mobile:** single column; buttons stack; a sticky bottom bar (gold "Free statement review" plus "Call 888-792-0284" on navy).
