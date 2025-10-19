/**
 * generate-og.js
 *
 * Automatically generates OG images for all blogs
 * using your /api/og?title=<title> endpoint.
 * If generation fails, uses a random valid OG from cache as fallback.
 */

const fs = require("fs");
const path = require("path");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { blogs } = require("./generate-md");

const cacheDir = path.join(process.cwd(), "public/og-cache");
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

const BASE_URL = process.env.VERCEL_URL || "http://localhost:3000";

function sanitizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function isImageValid(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.size < 5 * 1024) return false;
    const buffer = fs.readFileSync(filePath);
    return (
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[buffer.length - 2] === 0xff &&
      buffer[buffer.length - 1] === 0xd9
    );
  } catch {
    return false;
  }
}

function getRandomValidImage() {
  try {
    const files = fs.readdirSync(cacheDir).filter((f) => f.endsWith(".jpg"));
    const validFiles = files.filter((f) => isImageValid(path.join(cacheDir, f)));
    if (validFiles.length === 0) return null;
    const randomFile = validFiles[Math.floor(Math.random() * validFiles.length)];
    return path.join(cacheDir, randomFile);
  } catch {
    return null;
  }
}

async function fetchWithRetry(url, title, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { timeout: 60000 });
      if (res.ok) return res;
      console.warn(`⚠️ Attempt ${attempt} failed for "${title}" (${res.statusText})`);
    } catch (err) {
      console.warn(`⚠️ Attempt ${attempt} error for "${title}": ${err.message}`);
      if (err.code === "ECONNRESET" || err.message.includes("socket hang up")) {
        await delay(2000);
      }
    }
  }
  throw new Error(`❌ All retries failed for "${title}"`);
}

async function generateForBlog(slug, data) {
  const safeSlug = sanitizeFileName(data.title);
  const title = data.title;
  const imagePath = path.join(cacheDir, `${safeSlug}.jpg`);

  if (fs.existsSync(imagePath) && isImageValid(imagePath)) {
    console.log(`⏩ Skipped (valid): ${safeSlug}.jpg`);
    return;
  }

  if (fs.existsSync(imagePath) && !isImageValid(imagePath)) {
    console.warn(`⚠️ Broken image detected, regenerating: ${safeSlug}.jpg`);
    fs.unlinkSync(imagePath);
  }

  try {
    const url = `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`;
    const res = await fetchWithRetry(url, title, 3);

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(imagePath, buffer);

    if (!isImageValid(imagePath)) {
      throw new Error("Generated image invalid after retries");
    }

    console.log(`✅ Created: ${imagePath}`);
  } catch (err) {
    console.error(`🚨 Failed to generate ${slug}: ${err.message}`);

    // 🧩 Use random existing image as fallback
    const fallback = getRandomValidImage();
    if (fallback) {
      fs.copyFileSync(fallback, imagePath);
      console.warn(`🧩 Used fallback image: ${path.basename(fallback)} → ${safeSlug}.jpg`);
    } else {
      console.error(`❌ No valid fallback image available for ${safeSlug}.jpg`);
    }
  }

  await delay(500);
}

async function generateOGImages() {
  console.log("🚀 Generating OG images for all blogs in batches of 5...");

  const entries = Object.entries(blogs);
  const batchSize = 5;

  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    console.log(
      `📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(entries.length / batchSize)}`
    );

    await Promise.all(batch.map(([slug, data]) => generateForBlog(slug, data)));

    await delay(2000);
  }

  console.log("\n🎉 All OG images processed and validated!");
}

generateOGImages();
