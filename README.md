# For Amina 🌹

A romantic, cinematic birthday website — a gift from Mansur to Amina Gumel.

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

> **Note:** `predev` runs automatically and generates `src/generated/media.json`
> (video list) and optimised WebP images in `public/images/optimized/`.

---

## Editing copy

All text lives in **`src/content.ts`**. Open it and change any string — the site
re-renders instantly in dev mode. Never hardcode text in components.

Key exports:
| Export | What it controls |
|---|---|
| `HERO` | Headline, date, subline |
| `STORY` | Story paragraphs + signature |
| `MEMORIES.polaroids` | Captions for the three polaroid photos |
| `TIMELINE.years` | The three year blurbs (01, 02, 03) |
| `MAKE_A_WISH` | Lantern section copy |
| `LETTER.paragraphs` | The full letter text, paragraph by paragraph |
| `FOOTER` | "Made with love", "Built by Askar DEV", replay label |

---

## Adding / replacing photos

Place JPEG or PNG files in **`public/images/`** named:

```
her-1.jpg   ← Hero portrait (arch frame)
her-2.jpg   ← Polaroid 1
her-3.jpg   ← Polaroid 2 (also used in timeline)
her-4.jpg   ← Polaroid 3
her-5.jpg   ← Extra (used in memories)
her-6.jpg   ← Extra
```

Then run `npm run optimize` to regenerate the WebP versions. The site
uses optimised WebP with JPEG fallback automatically.

---

## Adding videos

Drop `.mp4` files named **`video-1.mp4`**, `video-2.mp4`, etc. into
**`public/videos/`**. Run `npm run media-manifest` (or just `npm run dev`)
and they appear automatically in the Moving Moments section. Zero videos = section hidden.

---

## Building for production

```bash
npm run build
```

Output is in the **`dist/`** folder.

---

## Deploying

### Vercel (recommended — zero config)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Framework: **Vite**. Build command: `npm run build`. Output: `dist`.

### Netlify Drop (fastest)

1. Run `npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the entire **`dist/`** folder onto the page.
4. Done — live in seconds.

### Any static host

Upload the contents of `dist/` to any CDN or static hosting (GitHub Pages,
Cloudflare Pages, Render, etc.). No server required.

---

## Phone checklist

Before sharing, verify on your phone:

- [ ] Gate screen fades in cleanly — "Today is all yours." text is readable
- [ ] "Open your gift" button is easy to tap (large enough)
- [ ] Hero loads — "Amina" headline and her photo visible above the fold
- [ ] Scroll down — petals drift away smoothly
- [ ] String lights section: polaroids are tappable, lightbox opens and closes (Esc)
- [ ] Timeline: gold thread draws itself as you scroll
- [ ] Videos section: arch video starts playing, speaker icon visible, swipe works
- [ ] Lantern: tap it — lanterns float up, wish text appears
- [ ] Letter: tap the wax seal — envelope opens, letter reveals paragraph by paragraph
- [ ] Footer: **"Built by Askar DEV"** is bold and clearly visible
- [ ] Replay button scrolls back to top
- [ ] Rotate to landscape — nothing overflows or breaks
- [ ] No images show a broken icon (blush gradient fallback instead)
