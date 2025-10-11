/**
 * generate-og.js
 *
 * Automatically generates OG images for all blogs
 * using your /api/og?title=<title> endpoint.
 */

const fs = require("fs");
const path = require("path");


// 🧩 Import your blog list from generate-md.js
// Or paste the same blog object here directly if you prefer.
const { blogs } = require("./generate-md");

// 🗂 Where to save OG images
const cacheDir = path.join(process.cwd(), "public/og-cache");
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

// 🌐 Base URL for your running app
const BASE_URL =
  process.env.VERCEL_URL || "http://localhost:3000";

// 🧠 Utility
function sanitizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function generateOGImages() {
  console.log("🚀 Generating OG images for all blogs...");

  for (const [slug, data] of Object.entries(blogs)) {
    const safeSlug = sanitizeFileName(data.title);
    const title = data.title;
    const imagePath = path.join(cacheDir, `${safeSlug}.jpg`);

    // ⏭ Skip if already exists
    if (fs.existsSync(imagePath)) {
      console.log(`⏩ Skipped (already exists): ${safeSlug}.jpg`);
      continue;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`
      );

      if (!res.ok) {
        console.error(`❌ Failed for ${slug}: ${res.statusText}`);
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(imagePath, buffer);
      console.log(`✅ Created: ${imagePath}`);
    } catch (err) {
      console.error(`⚠️ Error generating OG for ${slug}:`, err);
    }
  }

  console.log("\n🎉 All OG images processed!");
}

generateOGImages();
