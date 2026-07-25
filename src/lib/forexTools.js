export const forexTools = [
  {
    slug: "position-size-calculator",
    title: "Position Size Calculator",
    shortTitle: "Position Size Calculator",
    description:
      "Calculate optimal lot size based on account balance, risk percentage, stop loss distance, and pip value so each trade stays inside your risk plan.",
    category: "Risk Management",
    badge: "Most Popular",
    accent: "blue",
    icon: "target",
    keywords: ["position size calculator", "forex lot size calculator", "risk per trade calculator"],
    overview: [
      "A position size calculator helps traders decide how many lots they can trade without risking too much on a single setup. Instead of guessing, you define account size, risk percentage, stop loss distance, and pip value, then let the calculator convert that risk into a tradable lot size.",
      "The core idea is simple: first decide the exact dollar amount you can lose, then divide that amount by the cost per pip of your stop loss distance. This keeps risk consistent even when market conditions change from one setup to another.",
      "This is one of the most important forex tools because strong entries still fail if position sizing is poor. Using a consistent lot-sizing model helps control drawdowns, protect trading capital, and keep execution aligned with a long-term trading plan."
    ],
    tips: [
      "Keep per-trade risk between 1% and 2% for most retail strategies.",
      "Combine this tool with your stop loss plan before entering a trade.",
      "Review the pip value first when trading JPY pairs or cross pairs.",
      "Round down your final lot size to the nearest value your broker supports.",
      "If your stop loss widens because of volatility, reduce lot size rather than increasing risk."
    ],
    examples: [
      {
        title: "Example 1: Conservative swing trade",
        inputs: "Balance: $10,000 | Risk: 1% | Stop: 50 pips | Pip Value: $10",
        result: "Risk amount = $100. Cost at stop per 1 lot = 50 x $10 = $500. Position size = $100 / $500 = 0.20 lots."
      },
      {
        title: "Example 2: Intraday setup",
        inputs: "Balance: $5,000 | Risk: 2% | Stop: 25 pips | Pip Value: $10",
        result: "Risk amount = $100. Cost at stop per 1 lot = 25 x $10 = $250. Position size = $100 / $250 = 0.40 lots."
      },
      {
        title: "Example 3: Wider stop in volatility",
        inputs: "Balance: $20,000 | Risk: 1.5% | Stop: 80 pips | Pip Value: $10",
        result: "Risk amount = $300. Cost at stop per 1 lot = 80 x $10 = $800. Position size = $300 / $800 = 0.375 lots, usually rounded down to 0.37 lots."
      }
    ],
    faqs: [
      {
        question: "What is the best risk percentage per trade?",
        answer: "Many traders use 1% to 2% risk per trade to reduce drawdown pressure while keeping account growth potential. The right value depends on your strategy and tolerance for losing streaks."
      },
      {
        question: "Why does lot size get smaller when stop loss is bigger?",
        answer: "A wider stop means each lot can lose more money before the trade is closed. To keep your total risk fixed, the calculator must reduce the number of lots."
      },
      {
        question: "Should I round lot size up or down?",
        answer: "Round down whenever possible. Rounding up can push the actual risk above your plan, especially on smaller accounts."
      },
      {
        question: "Do I need a different pip value for every pair?",
        answer: "Yes, pip value changes by instrument, lot size, and account currency context. For accuracy, confirm pip value before finalizing position size."
      },
      {
        question: "Can I use the same model for gold or indices?",
        answer: "The risk logic is the same, but contract size and tick value differ. Use dedicated calculators like Gold Lot Size for XAUUSD when possible."
      }
    ],
    relatedSlugs: ["risk-reward-calculator", "pip-value-calculator", "profit-calculator"]
  },
  {
    slug: "pip-value-calculator",
    title: "Pip Value Calculator",
    shortTitle: "Pip Value Calculator",
    description:
      "Estimate the dollar value of each pip for common forex pairs and lot sizes to improve stop loss planning and risk control.",
    category: "Trade Planning",
    badge: "Live",
    accent: "purple",
    icon: "ruler",
    keywords: ["pip value calculator", "forex pip calculator", "pip worth calculator"],
    overview: [
      "A pip value calculator shows how much one pip is worth for a given pair and lot size. This makes it easier to understand how much money is actually at risk when price moves against your position.",
      "The tool is especially useful when traders move between standard lots, mini lots, and micro lots. It also helps translate technical stop loss distances into actual monetary exposure.",
      "Use the symbol, pip amount, lot size, account currency, and ask price together to model realistic trade sizing before execution. This workflow helps avoid underestimating risk when switching between majors, crosses, and JPY pairs."
    ],
    tips: [
      "JPY pairs use a different pip size than most major pairs.",
      "Use pip value before calculating position size.",
      "Recheck pip value when lot size changes.",
      "When your account currency is different from the quote currency, verify conversion assumptions.",
      "Use current ask price for cleaner calculations on volatile pairs."
    ],
    examples: [
      {
        title: "Example 1: EURUSD, USD account",
        inputs: "Pair: EUR/USD | Pip amount: 1 | Volume: 1.00 lots | Account currency: USD",
        result: "For EUR/USD, one pip is 0.0001. At 1 standard lot (100,000), pip value is about $10.00 in USD."
      },
      {
        title: "Example 2: GBPJPY, EUR account",
        inputs: "Pair: GBP/JPY | Pip amount: 1 | Volume: 0.50 lots | Account currency: EUR",
        result: "JPY pairs use 0.01 pip size. The calculator first gets value in quote terms, then converts it to EUR using available conversion logic."
      },
      {
        title: "Example 3: EURGBP, GBP account",
        inputs: "Pair: EUR/GBP | Pip amount: 2 | Volume: 0.30 lots | Account currency: GBP",
        result: "Increasing pip amount scales the result linearly. If 1 pip value is X, then 2 pips at same lot size is roughly 2X."
      }
    ],
    faqs: [
      {
        question: "What is pip value in forex trading?",
        answer: "Pip value is the monetary worth of a one-pip move for a specific symbol and trade size. It tells you how much profit or loss each pip adds to your position."
      },
      {
        question: "Why does pip value change between pairs?",
        answer: "Pip value depends on pair structure, pip size convention, lot size, and account currency conversion. JPY pairs and cross pairs often produce different values from EURUSD or GBPUSD."
      },
      {
        question: "Do I need ask price for pip value?",
        answer: "Ask price helps with conversion when your account currency differs from the symbol quote currency. Keeping this value updated improves practical accuracy."
      },
      {
        question: "Should pip value be calculated before position size?",
        answer: "Yes. Pip value is one of the core inputs required for precise position sizing and risk-per-trade planning."
      },
      {
        question: "Can beginners use this calculator safely?",
        answer: "Yes. Start with 1 pip and small lot values to understand how exposure changes, then combine it with Position Size Calculator and Risk-Reward Calculator for complete planning."
      }
    ],
    relatedSlugs: ["position-size-calculator", "risk-reward-calculator", "gold-lot-size-calculator"]
  },
  {
    slug: "risk-reward-calculator",
    title: "Risk-Reward Calculator",
    shortTitle: "Risk-Reward Calculator",
    description:
      "Analyze your entry, stop loss, and target levels to measure risk-reward ratio, expected reward, and minimum win-rate needs.",
    category: "Trade Quality",
    badge: "Live",
    accent: "emerald",
    icon: "scale",
    keywords: ["risk reward calculator", "rr ratio calculator", "trade reward calculator"],
    overview: [
      "A risk-reward calculator compares the distance between your entry and stop loss with the distance from entry to target. It helps you judge whether a setup offers enough upside to justify the downside.",
      "This tool is useful for filtering trades before execution. Many traders improve consistency simply by refusing setups with poor reward relative to the risk taken.",
      "By combining position type, entry, stop, target, and position size, you can estimate potential loss, potential profit, and break-even win rate before placing any order. This makes decision quality more objective and consistent."
    ],
    tips: [
      "Aim for a ratio that fits your win rate and strategy style.",
      "Check the ratio before moving stop loss or target levels.",
      "Use with market structure, not as a standalone signal.",
      "If the ratio is weak, adjust trade location or skip the setup.",
      "Always validate position size so potential loss matches your risk plan."
    ],
    examples: [
      {
        title: "Example 1: Long setup with 1:2.5 ratio",
        inputs: "Direction: Long | Entry: 150 | Stop: 145 | Target: 162.5 | Units: 100",
        result: "Risk per unit = $5.00, reward per unit = $12.50, potential loss = $500.00, potential profit = $1,250.00, break-even win rate = 28.6%."
      },
      {
        title: "Example 2: Short setup",
        inputs: "Direction: Short | Entry: 1.2550 | Stop: 1.2600 | Target: 1.2450 | Units: 50,000",
        result: "Risk per unit = 0.0050, reward per unit = 0.0100, so ratio is 1:2. Potential profit is double potential loss before costs."
      },
      {
        title: "Example 3: Tight target warning",
        inputs: "Direction: Long | Entry: 80 | Stop: 78 | Target: 81 | Units: 300",
        result: "Risk per unit = $2, reward per unit = $1. Ratio is 1:0.5, which requires very high win rate and is usually inefficient for most strategies."
      }
    ],
    faqs: [
      {
        question: "What is a good risk-reward ratio in trading?",
        answer: "Many traders look for at least 1:1.5 or 1:2, depending on strategy win rate. The best ratio is the one that keeps your expectancy positive over a large sample of trades."
      },
      {
        question: "What does break-even win rate mean?",
        answer: "Break-even win rate is the minimum win percentage needed to avoid losing money at a given risk-reward ratio, before fees and slippage."
      },
      {
        question: "Can I take trades with low reward ratio?",
        answer: "You can, but low reward relative to risk means you need much higher accuracy to stay profitable. Most traders improve stability by filtering out poor-ratio setups."
      },
      {
        question: "Should I use this with Position Size Calculator?",
        answer: "Yes. Risk-reward quality and position sizing work together. One helps evaluate trade quality, and the other controls capital exposure."
      },
      {
        question: "Does this include spread and commissions?",
        answer: "The calculator gives clean estimates based on prices and units. For live execution, account for spread, commissions, and slippage before finalizing the trade plan."
      }
    ],
    relatedSlugs: ["position-size-calculator", "profit-calculator", "volatility-calculator"]
  },
  {
    slug: "profit-calculator",
    title: "Forex Profit Calculator",
    shortTitle: "Profit Calculator",
    description:
      "Estimate profit or loss from an entry price, exit price, trade direction, and lot size using a simple forex P&L model.",
    category: "Performance",
    badge: "Live",
    accent: "indigo",
    icon: "badge-dollar-sign",
    keywords: ["forex profit calculator", "trade profit calculator", "pnl calculator forex"],
    overview: [
      "A profit calculator translates price movement into pips and then into estimated profit or loss. This helps traders understand the outcome of a trade before or after execution.",
      "The tool is useful for building scenarios. You can compare multiple targets, different lot sizes, and long or short trade ideas without manual arithmetic.",
      "By entering symbol, trade side, open and close prices, lot size, and holding period, you can quickly estimate gross profit and per-day outcome in a single view."
    ],
    tips: [
      "Use realistic spread and execution assumptions in live trading.",
      "Cross-check lot size before estimating final P&L.",
      "Combine with risk-reward analysis for cleaner planning.",
      "Validate pip value first when trading cross pairs or JPY pairs.",
      "Run best-case and worst-case scenarios before entering the trade."
    ],
    examples: [
      {
        title: "Example 1: EURUSD short trade",
        inputs: "Symbol: EUR/USD | Side: SELL | Open: 1.13728 | Close: 1.13678 | Volume: 1.00 lot | Period: 1 day",
        result: "Price moved 0.00050 in your favor on a 1-lot short position. Approximate gross profit is about $50 before fees."
      },
      {
        title: "Example 2: GBPUSD long trade",
        inputs: "Symbol: GBP/USD | Side: BUY | Open: 1.25000 | Close: 1.25350 | Volume: 0.50 lots | Period: 2 days",
        result: "A 35-pip move with 0.50 lots gives an estimated positive result. Per-day profit is the gross result divided by the holding period."
      },
      {
        title: "Example 3: Losing scenario test",
        inputs: "Symbol: USD/JPY | Side: BUY | Open: 156.200 | Close: 155.900 | Volume: 0.20 lots | Period: 1 day",
        result: "Since close is lower than open on a buy position, the calculator returns a negative profit estimate to reflect the adverse move."
      }
    ],
    faqs: [
      {
        question: "What is the difference between profit and gross profit?",
        answer: "In this tool, gross profit is the raw trade result estimate from price movement and position size. Profit can be interpreted as normalized output over the selected period."
      },
      {
        question: "Does this include spread, commission, and swap?",
        answer: "No. The calculator gives a clean directional estimate. Real trading results can be lower after spread, commission, slippage, and overnight charges."
      },
      {
        question: "Why can two pairs with similar movement show different outcomes?",
        answer: "Pip structure and quote-currency conversion can differ across symbols, especially for JPY and cross pairs, which changes monetary outcome."
      },
      {
        question: "Should I use this before entering or after closing a trade?",
        answer: "Both. Use it before entry for scenario planning and after close for quick performance review against your expected outcome."
      },
      {
        question: "What tool should I pair with this calculator?",
        answer: "Use Position Size Calculator for risk control, Pip Value Calculator for pip worth context, and Risk-Reward Calculator for setup quality evaluation."
      }
    ],
    relatedSlugs: ["risk-reward-calculator", "position-size-calculator", "pip-value-calculator"]
  },
  {
    slug: "forex-session-clock",
    title: "Forex Session Clock",
    shortTitle: "Forex Session Clock",
    description:
      "Track the live UTC time and see which major forex sessions are active, opening soon, or overlapping right now.",
    category: "Market Timing",
    badge: "Live",
    accent: "amber",
    icon: "clock-3",
    keywords: ["forex session clock", "forex market sessions", "trading session timer"],
    overview: [
      "A forex session clock shows when Sydney, Tokyo, London, and New York are open. This matters because liquidity and volatility often change when one session closes and another begins.",
      "The tool helps traders align strategy with market conditions. Scalpers, day traders, and breakout traders often perform better when they know which session or overlap they are trading."
    ],
    tips: [
      "London and New York overlap often brings the strongest moves.",
      "Tokyo session can be more range-bound for some pairs.",
      "Use session timing with your preferred currency pairs."
    ],
    relatedSlugs: ["live-market-session-status", "volatility-calculator", "correlation-tool"]
  },
  {
    slug: "live-market-session-status",
    title: "Live Market Session Status",
    shortTitle: "Live Market Status",
    description:
      "See whether the forex market is open or closed and track the active global sessions in real time.",
    category: "Market Timing",
    badge: "Live",
    accent: "sky",
    icon: "globe-2",
    keywords: ["forex market status", "market open closed forex", "live forex session status"],
    overview: [
      "Live market status helps traders avoid confusion around weekend closures and session transitions. Instead of guessing whether forex is open, you can check the current session state immediately.",
      "This is especially useful for newer traders who want a quick dashboard before placing trades or checking volatility expectations."
    ],
    tips: [
      "Market status is a timing filter, not a trading signal.",
      "Weekend gaps still matter even when the market is closed.",
      "Combine status with the session clock for context."
    ],
    relatedSlugs: ["forex-session-clock", "position-size-calculator", "volatility-calculator"]
  },
  {
    slug: "gold-lot-size-calculator",
    title: "Gold Lot Size Calculator",
    shortTitle: "Gold Lot Size Calculator",
    description:
      "Calculate position size for XAUUSD trades based on account balance, risk percentage, and stop loss distance in dollars.",
    category: "Risk Management",
    badge: "Live",
    accent: "amber",
    icon: "coins",
    keywords: ["gold lot size calculator", "xauusd position size", "gold risk calculator"],
    overview: [
      "Gold moves differently from major forex pairs, so traders often need a dedicated lot size tool for XAUUSD. This calculator helps convert stop loss distance into a sensible lot size using a fixed contract assumption.",
      "Using a separate gold calculator is useful because volatility in precious metals can expand quickly. Better sizing helps traders stay consistent when moving between forex majors and gold."
    ],
    tips: [
      "Gold volatility often spikes around news and US sessions.",
      "Keep stop loss realistic rather than forcing oversized positions.",
      "Use the same risk percentage you use in forex if your plan is consistent."
    ],
    relatedSlugs: ["position-size-calculator", "volatility-calculator", "risk-reward-calculator"]
  },
  {
    slug: "compounding-calculator",
    title: "Compounding Calculator",
    shortTitle: "Compounding Calculator",
    description:
      "Project account growth using balance, risk per trade, win rate, reward ratio, and number of trades.",
    category: "Growth Planning",
    badge: "Live",
    accent: "emerald",
    icon: "chart-column",
    keywords: ["compounding calculator", "forex growth calculator", "account growth projection"],
    overview: [
      "A compounding calculator helps traders model how disciplined execution can grow an account over time. It combines win rate, average reward, and risk percentage into a simplified growth projection.",
      "This tool is best used for planning and expectation management. It shows how consistency and position control influence account growth much more than chasing oversized trades."
    ],
    tips: [
      "Use conservative win-rate assumptions.",
      "Avoid unrealistic reward multiples in projections.",
      "Compounding works best when risk stays controlled."
    ],
    relatedSlugs: ["position-size-calculator", "risk-reward-calculator", "profit-calculator"]
  },
  {
    slug: "volatility-calculator",
    title: "Volatility Calculator",
    shortTitle: "Volatility Calculator",
    description:
      "Measure how large your stop loss or target is relative to the instrument's daily range and expected movement.",
    category: "Trade Planning",
    badge: "Live",
    accent: "orange",
    icon: "activity",
    keywords: ["volatility calculator", "forex range calculator", "atr planning tool"],
    overview: [
      "A volatility calculator compares your planned stop loss and target with a market's average daily movement. This gives traders context about whether their levels are too tight, too wide, or proportionate to the current range.",
      "Volatility analysis is useful when traders want to adapt strategy to changing conditions instead of using the same stop loss size every day."
    ],
    tips: [
      "Tight stops struggle in highly volatile sessions.",
      "Compare target size with average daily range before entering.",
      "Use volatility with session timing and structure."
    ],
    relatedSlugs: ["risk-reward-calculator", "forex-session-clock", "live-market-session-status"]
  },
  {
    slug: "correlation-tool",
    title: "Correlation Tool",
    shortTitle: "Correlation Tool",
    description:
      "Check sample currency-pair correlations and understand whether two instruments may amplify or reduce combined exposure.",
    category: "Portfolio Risk",
    badge: "Live",
    accent: "violet",
    icon: "git-compare-arrows",
    keywords: ["forex correlation tool", "currency pair correlation", "correlation calculator forex"],
    overview: [
      "A correlation tool helps traders understand whether two currency pairs tend to move together, move apart, or behave independently. This is important when holding multiple trades at the same time.",
      "Correlation analysis improves portfolio control. Two separate trades can still represent the same directional risk if the pairs are highly correlated."
    ],
    tips: [
      "Positive correlation can duplicate risk across trades.",
      "Negative correlation can hedge or conflict with existing positions.",
      "Review correlation alongside your strongest and weakest currency themes."
    ],
    relatedSlugs: ["position-size-calculator", "live-market-session-status", "forex-session-clock"]
  }
];

export const backlinkLinks = [
  { href: "/", label: "Live Currency Strength Meter" },
  { href: "/getting-started", label: "Getting Started Guide" },
  { href: "/blog", label: "Intelligence Blog" },
  { href: "/resources", label: "Forex Resources" }
];

export function getForexTool(slug) {
  return forexTools.find((tool) => tool.slug === slug);
}
