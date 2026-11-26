/**
 * scripts/optimize-images.mjs
 * Generates 1600px WebP + tiny placeholder for her-1 through her-6.
 * Silently skips if sharp is unavailable (CI / first-time install).
 */
import { existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root    = join(__dirname, "..");
const srcDir  = join(root, "public", "images");
const outDir  = join(root, "public", "images", "optimized");

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.log("[optimize-images] sharp not available — skipping (pre-built WebPs will be used if present).");
  process.exit(0);   // exit 0 so prebuild never fails
}

const TARGETS = ["her-1.jpg","her-2.jpg","her-3.jpg","her-4.jpg","her-5.jpg","her-6.jpg"];

for (const name of TARGETS) {
  const src = join(srcDir, name);
  if (!existsSync(src)) { console.log(`[optimize-images] skip (missing): ${name}`); continue; }

  const base = name.replace(/\.[^.]+$/, "");

  try {
    await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(join(outDir, `${base}.webp`));
    await sharp(src).resize({ width: 20 }).blur(2).webp({ quality: 20 }).toFile(join(outDir, `${base}-placeholder.webp`));
    console.log(`[optimize-images] ✓  ${base}`);
  } catch (err) {
    console.warn(`[optimize-images] warn: could not process ${name}:`, err.message);
  }
}

console.log("[optimize-images] done.");
