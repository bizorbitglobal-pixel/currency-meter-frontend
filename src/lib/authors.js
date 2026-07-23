export const DEFAULT_AUTHOR = {
  name: "John Marks",
  slug: "john-marks",
  role: "Senior Forex Analyst & Writer",
  experience: "More than 15 years of experience in forex markets",
  bio: "John Marks is a senior forex analyst and trading educator with more than 15 years of experience studying currency markets, macroeconomic trends, technical analysis, and risk management. He writes practical, research-based guides to help traders understand market strength and make more informed decisions.",
  specialties: [
    "Forex market analysis",
    "Currency strength and momentum",
    "Technical and fundamental analysis",
    "Risk management and trading psychology",
  ],
};

export function slugifyAuthor(name = DEFAULT_AUTHOR.name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAuthor(author) {
  const name = typeof author === "string" && author.trim() ? author.trim() : DEFAULT_AUTHOR.name;

  if (slugifyAuthor(name) === DEFAULT_AUTHOR.slug) {
    return DEFAULT_AUTHOR;
  }

  return {
    ...DEFAULT_AUTHOR,
    name,
    slug: slugifyAuthor(name),
  };
}
