import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const asset = (name) => path.join(root, "app/public", name);
const output = (name) => path.join(root, "app", name);
const cream = "#f7f2ea";

// The original logo includes ample transparent margins. Use its monogram at
// favicon sizes, and its complete lockup for the larger home-screen icon.
const monogram = await sharp(asset("logo.png"))
  .extract({ left: 340, top: 223, width: 332, height: 355 })
  .resize(44, 46, { fit: "inside" }).png().toBuffer();
const icon = await sharp({ create: { width: 64, height: 64, channels: 4, background: cream } })
  .composite([{ input: monogram, gravity: "centre" }]).png().toBuffer();
await writeFile(output("icon.png"), icon);

// ICO with a PNG payload, supported by modern browsers and favicon crawlers.
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 64;
header[7] = 64;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(icon.length, 14);
header.writeUInt32LE(22, 18);
await writeFile(output("favicon.ico"), Buffer.concat([header, icon]));

const lockup = await sharp(asset("logo.png")).trim().resize(140, 140, { fit: "inside" }).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: cream } })
  .composite([{ input: lockup, gravity: "centre" }]).png().toFile(output("apple-icon.png"));

const socialLogo = await sharp(asset("logo.png")).trim().resize(116, 124, { fit: "inside" }).png().toBuffer();
const photo = await sharp(asset("terramosaica_blue_zellige.png")).resize(560, 630, { fit: "cover" }).png().toBuffer();
const typography = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <g fill="#2d1d17">
    <text x="58" y="285" font-family="Georgia, serif" font-size="59" letter-spacing="-2">L’art du zellige</text>
    <text x="58" y="352" font-family="Georgia, serif" font-size="59" font-style="italic" letter-spacing="-2">marocain.</text>
    <text x="60" y="424" font-family="Arial, sans-serif" font-size="19">Trois siècles, six générations.</text>
    <text x="60" y="456" font-family="Arial, sans-serif" font-size="19">Façonné à la main au Maroc.</text>
    <path d="M60 510h70" stroke="#8d3025" stroke-width="2"/>
    <text x="60" y="553" font-family="Arial, sans-serif" font-size="15" letter-spacing="3">TERRA MOSAICA</text>
  </g>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: cream } })
  .composite([
    { input: photo, left: 640, top: 0 },
    { input: socialLogo, left: 60, top: 48 },
    { input: typography, left: 0, top: 0 },
  ]).png().toFile(output("opengraph-image.png"));
console.log("Generated favicon, browser icon, Apple icon, and 1200 × 630 social preview.");
