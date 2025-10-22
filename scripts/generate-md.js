/**
 * generate-md.js
 *
 * Generates Markdown blog files with full SEO frontmatter for Next.js + gray-matter + remark.
 * Auto-formats heading lines (adds ## for Markdown headings).
 * Adds unique OG images, readingTime, and slug.
 * Skips existing .md files unless --force flag is used.
 * Usage:
 *    node generate-md.js          → only create new files
 *    node generate-md.js --force  → overwrite all files
 */

const fs = require("fs");
const path = require("path");
const blogsData = require("./blogsData.js");

// ✅ Full blog data
const blogs = blogsData;

// 🗂 Output directory
const outputDir = path.join(process.cwd(), "content/blog");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// ⚙️ Detect `--force` flag
const forceMode = process.argv.includes("--force");
if (forceMode) {
  console.log("⚠️  Force mode ON — existing blog files will be overwritten.\n");
} else {
  console.log("ℹ️  Normal mode — existing blog files will be skipped.\n");
}

// 🧠 Utility: Clean filename
function sanitizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ✍️ Write Markdown files
Object.entries(blogs).forEach(([slug, data]) => {
  const safeSlug = sanitizeFileName(data.title);
  const filePath = path.join(outputDir, `${safeSlug}.md`);

  // ✅ Skip if file exists and not in force mode
  if (!forceMode && fs.existsSync(filePath)) {
    console.log(`⏭️ Skipped (already exists): ${safeSlug}.md`);
    return;
  }

  let { title, content, tags = [] } = data;

  // 🧹 Auto-upgrade plain lines to Markdown headings
  const fixedContent = content
    .split("\n")
    .map((line) => {
      if (
        /^[A-Z][A-Za-z\s&]+$/.test(line.trim()) &&
        !line.trim().startsWith("#") &&
        line.trim().length < 80
      ) {
        return "## " + line.trim();
      }
      return line;
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");

  // ✨ Generate meta description + excerpt
  const plainText = fixedContent
    .replace(/\n/g, " ")
    .replace(/#+\s/g, "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const description = plainText.split(".")[0].substring(0, 145).trim() + "...";
  const excerpt = plainText.split(" ").slice(0, 50).join(" ") + "...";

  // ✅ Auto-assign OG image per blog
  const ogImage = `https://www.currencystrengthsmeters.com/og-cache/${safeSlug}.jpg`;

  const keywords = data.keywords || [];

  // 🧩 YAML Frontmatter
  const frontmatter = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `date: "${new Date().toISOString()}"`,
    `excerpt: "${excerpt.replace(/"/g, '\\"')}"`,
    `tags: [${tags.map((t) => `"${t}"`).join(", ")}]`,
    `keywords: [${keywords.map((k) => `"${k}"`).join(", ")}]`,
    `ogImage: "${ogImage}"`,
    "---",
    "",
  ].join("\n");

  // 💾 Write Markdown
  const markdown = frontmatter + fixedContent.trim() + "\n";
  fs.writeFileSync(filePath, markdown, "utf8");

  if (forceMode) {
    console.log(`♻️  Overwritten: ${safeSlug}.md`);
  } else {
    console.log(`✅ Created new: ${safeSlug}.md`);
  }
});

console.log(
  `\n🎉 Markdown generation complete — ${forceMode ? "all files refreshed" : "only new blogs added"}!`
);
