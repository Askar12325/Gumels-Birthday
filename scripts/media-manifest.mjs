/**
 * scripts/media-manifest.mjs
 * Scans public/videos for video-*.mp4 (sorted naturally) and writes
 * src/generated/media.json  →  { videos: ["video-1.mp4", ...] }
 * Run via: npm run media-manifest   (also fires in predev / prebuild)
 */
import { readdirSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const videosDir = join(root, "public", "videos");
const outDir    = join(root, "src", "generated");
const outFile   = join(outDir, "media.json");

// Ensure output dir exists
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// Collect video-*.mp4 files
let videos = [];
if (existsSync(videosDir)) {
  videos = readdirSync(videosDir)
    .filter(f => /^video-\d+\.mp4$/i.test(f))
    .sort((a, b) => {
      const na = parseInt(a.match(/\d+/)[0], 10);
      const nb = parseInt(b.match(/\d+/)[0], 10);
      return na - nb;
    });
}

const manifest = { videos };
writeFileSync(outFile, JSON.stringify(manifest, null, 2), "utf8");
console.log(`[media-manifest] wrote ${videos.length} video(s) → src/generated/media.json`);
