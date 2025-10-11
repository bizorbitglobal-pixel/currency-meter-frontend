/**
 * generate-md.js
 *
 * Generates Markdown blog files with full SEO frontmatter for Next.js + gray-matter + remark.
 * Auto-formats heading lines (adds ## for Markdown headings).
 * Adds unique OG images, readingTime, and slug.
 * Usage: node generate-md.js
 */

const fs = require("fs");
const path = require("path");

// ✅ Full blog data (all your topics)
const blogs = {
  "use-currency-strength-meter": {
    title: "How to Use a Currency Strength Meter in Forex Trading",
    tags: ["forex", "currency strength meter", "trading strategy", "analysis"],
    content: `
**Introduction to Currency Strength Meters in Forex Trading**

Forex trading is a challenging but rewarding endeavor where successful traders can make significant profits by analyzing currency pairs. One of the most powerful tools that can assist in making these informed decisions is the **currency strength meter**.

The core concept behind using a currency strength meter lies in understanding which currencies are stronger than others. By identifying the strongest and weakest currencies, traders can pair them in a way that maximizes their chances of success.

**What is a Currency Strength Meter?**

A currency strength meter is a forex trading tool designed to visually represent the strength of different currencies relative to each other. It allows traders to see which currencies are strong (bullish) and which are weak (bearish), helping them make more informed trading decisions.

**How to Use It in Your Strategy**

1. Trend Following Strategy  
2. Breakout Strategy  
3. Scalping with Momentum  
4. Pairing the Strongest vs. Weakest  
5. Confirming Signals with Other Indicators

**Conclusion**

A currency strength meter is an essential tool for any forex trader looking to improve their decision-making process and consistency.
    `,
  },

  "top-5-strategies-with-a-currency-strength-indicator": {
    title: "Top 5 Strategies with a Currency Strength Indicator",
    tags: ["forex", "trading strategies", "currency indicator", "breakout"],
    content: `
Introduction

A currency strength indicator is one of the most powerful tools for forex traders, providing real-time analysis of currency movements. It helps traders identify the strongest and weakest currencies in the market.

The 5 Most Effective Strategies

1. Breakout Confirmation Strategy  
2. Trend Following Strategy  
3. Scalping with Momentum  
4. Pairing Strongest vs Weakest  
5. Combining with Candlestick Patterns

Conclusion

Integrating a currency strength indicator into your trading strategy can significantly enhance your ability to make informed decisions.
    `,
  },

  "short-vs-long-term-indicators": {
    title: "Short-Term vs Long-Term Strength Indicators",
    tags: ["forex", "analysis", "scalping", "swing trading"],
    content: `
Introduction

In forex trading, identifying the strength of currencies is crucial for success. One of the most important tools for this task is the **currency strength indicator**.

Short-Term Indicators for Scalpers

Short-term indicators provide quick insights for intraday or scalping traders, focusing on 1M–30M charts.

Long-Term Indicators for Swing Traders

Long-term indicators analyze market trends over daily or weekly charts, suitable for swing or position traders.

Combining Both

The best results come from combining short-term and long-term views to capture both trend direction and timing.

Conclusion

Understanding both short-term and long-term strength indicators helps traders choose the right strategy for their goals.
    `,
  },

  "currency-pair-selection-strategies": {
    title: "How to Select the Best Currency Pairs Using Strength Meters",
    tags: ["forex", "pair selection", "market sentiment", "currency meter"],
    content: `
Introduction

In forex trading, selecting the right currency pair is crucial to maximizing your success. A **currency strength meter** helps identify which currencies are strong and which are weak, allowing you to pair them effectively.

Key Steps for Pair Selection

1. Identify Strong and Weak Currencies  
2. Consider Volatility  
3. Focus on Liquid Pairs  
4. Analyze Correlations  
5. Monitor Market News and Sentiment

Practical Tips

- Combine with other indicators like RSI or Moving Averages  
- Analyze multiple timeframes  
- Stay updated on major economic events

Conclusion

Using a strength meter simplifies currency pair selection and helps traders find high-probability setups.
    `,
  },

  "combining-strength-meters-with-price-action": {
    title: "Combining Currency Strength Meters with Price Action for Better Entries",
    tags: ["forex", "price action", "currency meter", "trade entries"],
    content: `
Introduction

While currency strength meters provide valuable data, combining them with **price action** creates a stronger, confirmation-based trading approach.

How to Combine

1. Look for Confirming Signals  
2. Use Support and Resistance Levels  
3. Identify Trend Reversals  
4. Confirm Candlestick Patterns  

Example

If GBP shows strong momentum while USD weakens, and you spot a bullish engulfing candle on GBP/USD — this creates a powerful entry setup.

Conclusion

Pairing currency strength with price action helps traders enter with precision and confidence.
    `,
  },

  "multi-timeframe-analysis-strategies": {
    title: "How to Use Multi-Timeframe Analysis with Currency Strength Meters",
    tags: ["forex", "multi-timeframe", "technical analysis", "trend confirmation"],
    content: `
Introduction

Multi-timeframe analysis helps traders view the **big picture** and make consistent trading decisions using strength data from several time horizons.

How to Use It

1. Analyze Short-Term Strength  
2. Confirm with Higher Timeframes  
3. Watch for Divergence  

Pro Tips

- Always use consistent meter settings  
- Avoid trading when timeframes disagree  
- Combine with RSI or Moving Averages  

Conclusion

Multi-timeframe analysis improves accuracy by aligning entries with the dominant trend.
    `,
  },

  "advanced-strategy-with-strength-meters": {
    title: "Advanced Trading Strategies Using Currency Strength Meters",
    tags: ["forex", "advanced", "momentum", "trading systems"],
    content: `
Introduction

Advanced traders often look for methods to gain an edge in volatile markets. A **currency strength meter** is an invaluable component of advanced systems.

Advanced Strategies

1. Swing Trading with Strength Meters  
2. Reversal Trading  
3. Breakout and Momentum Confirmation  

Pro Tips

- Use stop-loss orders based on strength shifts  
- Watch for divergence between strength and price  
- Filter trades using multiple timeframes  

Conclusion

Incorporating strength meters into advanced strategies provides better entries, exits, and overall performance.
    `,
  },
  "currency-strength-meter-for-swing-trading": {
    title: "Using Currency Strength Meters for Swing Trading",
    tags: ["forex", "swing trading", "trend following", "strength meter"],
    content: `
Introduction

Swing trading focuses on capturing mid-term market movements that last from a few days to weeks. The **currency strength meter** helps identify trends early.

How to Apply It

1. Identify Strong and Weak Currencies  
2. Confirm the Trend Direction  
3. Enter on Retracements  

Tips

- Combine with trend indicators  
- Avoid counter-trend setups  
- Track news that affects major pairs  

Conclusion

A strength meter is an essential swing trading companion, helping you find trend-following opportunities with higher confidence.
    `,
  },
  "currency-strength-meter-for-scalping": {
    title: "Using Currency Strength Meters for Scalping",
    tags: ["forex", "scalping", "intraday", "momentum"],
    content: `
Introduction

Scalping is a fast-paced trading style that aims to profit from small price movements. A **currency strength meter** is a crucial tool for scalpers to identify quick opportunities.

How to Use It

1. Focus on 1M–15M Charts
2. Identify Strong vs. Weak Currencies
3. Enter on Momentum Shifts

Tips

- Use tight stop-loss orders
- Combine with volume indicators
- Avoid trading during low liquidity periods

Scalping is a fast-paced trading style that aims to profit from small price movements. A **currency strength meter** is a crucial tool for scalpers to identify quick opportunities.

How to Use It
1. Focus on 1M–15M Charts
2. Identify Strong vs. Weak Currencies
3. Enter on Momentum Shifts
Tips
- Use tight stop-loss orders
- Combine with volume indicators
- Avoid trading during low liquidity periods
Conclusion
A currency strength meter enhances scalping strategies by providing real-time insights into market momentum, helping traders make swift and informed decisions.
    `,  
  }
};

// 🗂 Output directory
const outputDir = path.join(process.cwd(), "content/blog");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

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

  const description =
    plainText.split(".")[0].substring(0, 160).trim() + "...";
  const excerpt = plainText.split(" ").slice(0, 50).join(" ") + "...";

  // ✅ Auto-assign OG image per blog
  const ogImage = `https://www.currencystrengthsmeters.com/og-cache/${safeSlug}.jpg`;

  // 🧩 YAML Frontmatter
  const frontmatter = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `date: "${new Date().toISOString()}"`,
    `excerpt: "${excerpt.replace(/"/g, '\\"')}"`,
    `tags: [${tags.map((t) => `"${t}"`).join(", ")}]`,
    `ogImage: "${ogImage}"`,
    "---",
    "",
  ].join("\n");

  // 💾 Write Markdown
  const markdown = frontmatter + fixedContent.trim() + "\n";
  const filePath = path.join(outputDir, `${safeSlug}.md`);
  fs.writeFileSync(filePath, markdown, "utf8");

  console.log(`✅ Created: ${filePath}`);
});

console.log(
  "\n🎉 All Markdown blog files generated successfully with custom OG image references!"
);

module.exports = { blogs };