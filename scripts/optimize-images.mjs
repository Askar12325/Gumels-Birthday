/**
 * scripts/optimize-images.mjs
 * Generates optimised 1600px-wide WebP + tiny blurred placeholder (20px)
 * for her-1.jpg through her-3.jpg in public/images/.
 * Skips missing source files silently.
 * Output: public/images/optimized/her-N.webp  +  her-N-placeholder.webp
 */
import { existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = join(__dirname, "..");
const srcDir    = join(root, "public", "images");
const outDir    = join(root, "public", "images", "optimized");

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// Dynamically import sharp so it doesn't blow up if not installed yet
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[optimize-images] sharp not available — skipping optimisation.");
  process.exit(0);
}

const TARGETS = ["her-1.jpg", "her-2.jpg", "her-3.jpg", "her-4.jpg", "her-5.jpg", "her-6.jpg"];

for (const name of TARGETS) {
  const src = join(srcDir, name);
  if (!existsSync(src)) {
    console.log(`[optimize-images] skip (missing): ${name}`);
    continue;
  }

  const baseName = name.replace(/\.[^.]+$/, "");

  // 1600px-wide WebP
  const fullOut = join(outDir, `${baseName}.webp`);
  await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(fullOut);

  // Tiny blurred placeholder (20px wide, heavily blurred → base64 later via CSS)
  const placeholderOut = join(outDir, `${baseName}-placeholder.webp`);
  await sharp(src)
    .resize({ width: 20 })
    .blur(2)
    .webp({ quality: 20 })
    .toFile(placeholderOut);

  console.log(`[optimize-images] ✓  ${baseName}`);
}

console.log("[optimize-images] done.");
