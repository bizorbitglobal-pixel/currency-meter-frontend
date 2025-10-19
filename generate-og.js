/**
 * generate-og.js
 *
 * Automatically generates OG images for all blogs
 * using your /api/og?title=<title> endpoint.
 */

const fs = require("fs");
const path = require("path");

// ✅ Add fetch support for Node.js <18
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// 🧩 Import your blog list from generate-md.js
const { blogs } = require("./generate-md");

// 🗂 Where to save OG images
const cacheDir = path.join(process.cwd(), "public/og-cache");
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

// 🌐 Base URL for your running app
const BASE_URL = process.env.VERCEL_URL || "http://localhost:3000";

// 🧠 Utility
function sanitizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// 🕒 Delay helper
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// 🧩 Generate OG for a single blog
async function generateForBlog(slug, data) {
  const safeSlug = sanitizeFileName(data.title);
  const title = data.title;
  const imagePath = path.join(cacheDir, `${safeSlug}.jpg`);

  // Skip if file already exists
  if (fs.existsSync(imagePath)) {
    console.log(`⏩ Skipped (already exists): ${safeSlug}.jpg`);
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/og?title=${encodeURIComponent(title)}`);

    if (!res.ok) {
      console.error(`❌ Failed for ${slug}: ${res.statusText}`);
      return;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(imagePath, buffer);
    console.log(`✅ Created: ${imagePath}`);
  } catch (err) {
    console.error(`⚠️ Error generating OG for ${slug}:`, err.message);
  }

  // ⏳ Small delay between each request to avoid overloading
  await delay(500);
}

// 🧩 Batch processor — 5 blogs at a time
async function generateOGImages() {
  console.log("🚀 Generating OG images for all blogs in batches of 5...");

  const entries = Object.entries(blogs);
  const batchSize = 5;

  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}...`);

    await Promise.all(batch.map(([slug, data]) => generateForBlog(slug, data)));

    // Optional: delay between batches
    await delay(1500);
  }

  console.log("\n🎉 All OG images processed!");
}

generateOGImages();
