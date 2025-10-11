import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

// 🧩 Utility: make sure we can slugify titles safely
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// 🧱 Persistent cache folder inside /public
const cacheDir = path.join(process.cwd(), "public/og-cache");
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Currency Strengths Meters";
    const slug = slugify(title);
    const cacheFile = path.join(cacheDir, `${slug}.json`);

    let bgImageUrl = null;

    // 1️⃣ Try cached file
    if (fs.existsSync(cacheFile)) {
      const cached = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
      if (cached?.bgImageUrl) {
        bgImageUrl = cached.bgImageUrl;
        console.log("✅ Loaded OG background from cache:", slug);
      }
    }

    // 2️⃣ Unsplash lookup
    if (!bgImageUrl) {
      const query = encodeURIComponent(
        `${title} forex trading currency market chart financial`
      );
      try {
        const unsplash = await fetch(
          `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
          { next: { revalidate: 86400 } }
        );
        if (unsplash.ok) {
          const data = await unsplash.json();
          bgImageUrl = data?.urls?.regular || null;
        }
      } catch (err) {
        console.warn("Unsplash fetch failed:", err.message);
      }
    }

    // 3️⃣ OpenAI fallback
    if (!bgImageUrl && process.env.OPENAI_API_KEY) {
      try {
        const prompt = `Create a professional, dark-themed forex trading background for a blog titled "${title}". 
        Include glowing charts, subtle graphs, and modern aesthetics.`;

        const aiRes = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-image-1",
            prompt,
            size: "1024x512",
          }),
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          bgImageUrl = aiData?.data?.[0]?.url || null;
        }
      } catch (err) {
        console.warn("AI image generation failed:", err.message);
      }
    }

    // 4️⃣ Default fallback
    if (!bgImageUrl)
      bgImageUrl = "https://www.currencystrengthsmeters.com/bg-forex-chart.png";

    // 5️⃣ Persist in /public/og-cache
    try {
      const fileName = `${slug}.jpg`;
      const imagePath = path.join(cacheDir, fileName);
      const publicUrl = `/og-cache/${fileName}`;

      // If not already saved locally, download and cache it
      if (!fs.existsSync(imagePath)) {
        const imgRes = await fetch(bgImageUrl);
        const arrayBuffer = await imgRes.arrayBuffer();
        fs.writeFileSync(imagePath, Buffer.from(arrayBuffer));
        console.log("🖼️ Cached image file:", fileName);
      }

      // Save JSON metadata
      fs.writeFileSync(
        cacheFile,
        JSON.stringify({ bgImageUrl: publicUrl }),
        "utf8"
      );
      bgImageUrl = publicUrl;
    } catch (err) {
      console.warn("Cache persist failed:", err.message);
    }

    // 6️⃣ Render OG image
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.9))",
            color: "white",
            fontFamily: "Inter, sans-serif",
            padding: "60px",
            textAlign: "center",
          }}
        >
          {/* Background */}
          <img
            src={bgImageUrl}
            alt="background"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.25,
            }}
          />

          {/* Logo */}
          <img
            src="https://www.currencystrengthsmeters.com/logo.png"
            alt="Logo"
            width="140"
            height="140"
            style={{
              position: "absolute",
              top: 40,
              left: 60,
              opacity: 0.9,
              objectFit: "contain",
            }}
          />

          {/* Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.2,
              maxWidth: "1000px",
              marginBottom: "40px",
              zIndex: 10,
              background: "linear-gradient(90deg, #60a5fa, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              marginTop: "10px",
              zIndex: 10,
            }}
          >
            CurrencyStrengthsMeters.com
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG generation error:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
