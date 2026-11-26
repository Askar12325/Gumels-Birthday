---
inclusion: always
---

# Amina Birthday Site — Project Steering

## Overview
A romantic, cinematic birthday website. Gift from Mansur to Amina Gumel on 27 November 2026.
Tone: warm golden-hour light, soft, graceful, joyful, intimate, premium.
Like a luxury wedding invitation crossed with a short film.

## Constants
- HER_NAME = "Amina"
- HER_FULL_NAME = "Amina Gumel"
- HIS_NAME = "Mansur"
- BIRTHDAY = "27 November 2026"
- All copy lives in `src/content.ts`.

## Design Tokens

### Colour Palette (light, warm — NOT dark)
| Token              | Hex       | Use                              |
|--------------------|-----------|----------------------------------|
| `cream`            | #FBF3EA   | Background base                  |
| `blush`            | #F3D9D3   | Soft accent, photo bg fallback   |
| `dusty-rose`       | #C98F88   | Mid accent                       |
| `deep-rose`        | #A8646A   | Strong accent                    |
| `dusk-blue`        | #3E4A80   | Accent (use sparingly)           |
| `night`            | #1D2142   | Only for the wish section        |
| `amber`            | #E7B46A   | Primary highlight, glow          |
| `ink`              | #2B2227   | Body text                        |

### Typography
- **Playfair Display** — Display headings; italic variant for emphasis
- **DM Sans** — Body copy, UI labels, captions
- **Pinyon Script** — Script accents ("my love", "gift")

### Motifs
- **Arch shape**: `border-radius: 999px 999px 0 0` — signature recurring shape
- **Grain overlay**: subtle paper texture via CSS pseudo-element
- **Gold hairlines**: 1px solid with amber/gold colour
- **Warm radial glows**: amber to blush, soft and large

### Motion Rules
- Slow, eased, weighty: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out)
- Never bouncy or spring-based
- Always respect `prefers-reduced-motion` — calm static fallback
- Lenis smooth scroll + GSAP ScrollTrigger

### Layout
- Mobile-first: design at 390px, then 768, 1024, 1440+
- `100dvh`, safe-area insets
- 44px minimum touch targets
- WCAG AA contrast

## Quality Rules
- Semantic HTML5
- Keyboard navigable, visible focus rings
- Key copy as real DOM text (not canvas/image text)
- Error boundary wrapping the 3D canvas
- No-WebGL fallback: CSS gradient hero
- Clamp DPR to [1, 2]
- Fewer particles on mobile (≤600 on mobile vs ≤1400 desktop)
- No postprocessing on mobile

## File Conventions
- `src/content.ts` — all copy strings, single source of truth
- `src/components/` — reusable UI components (Section, Reveal, ArchFrame, etc.)
- `src/scenes/` — R3F 3D scenes
- `src/hooks/` — custom React hooks
- `src/lib/` — pure utilities (math, motion helpers)
- `src/styles/` — global CSS
- `public/images/` — static images (her-1.jpg etc.)
- `public/videos/` — optional video assets
