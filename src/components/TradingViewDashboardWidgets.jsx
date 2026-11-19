"use client";

import { useEffect, useRef } from "react";

const WIDGETS = [
  {
    id: "tickers",
    tag: "tv-tickers",
    src: "https://widgets.tradingview-widget.com/w/en/tv-tickers.js",
    attributes: {
      symbols:
        "FOREXCOM:SPXUSD,FOREXCOM:NSXUSD,FX:EURUSD,BITSTAMP:BTCUSD,BITSTAMP:ETHUSD",
      "hide-chart": "",
    },
  },
  {
    id: "advanced-chart",
    tag: "tv-advanced-chart",
    src: "https://widgets.tradingview-widget.com/w/en/tv-advanced-chart.js",
    attributes: { "allow-symbol-change": "" },
  },
  {
    id: "market-data",
    tag: "tv-market-data",
    src: "https://widgets.tradingview-widget.com/w/en/tv-market-data.js",
    attributes: {
      "symbol-sectors":
        '[{"sectionName":"Indices","symbols":["FOREXCOM:SPXUSD","FOREXCOM:NSXUSD","FOREXCOM:DJI","INDEX:NKY","INDEX:DEU40","FOREXCOM:UKXGBP"]},{"sectionName":"Futures","symbols":["BMFBOVESPA:ISP1!","BMFBOVESPA:EUR1!","CMCMARKETS:GOLD","TVC:USOIL","BMFBOVESPA:CCM1!"]},{"sectionName":"Bonds","symbols":["EUREX:FGBL1!","EUREX:FBTP1!","EUREX:FGBM1!"]},{"sectionName":"Forex","symbols":["FX:EURUSD","FX:GBPUSD","FX:USDJPY","FX:USDCHF","FX:AUDUSD","FX:USDCAD"]}]',
    },
  },
  {
    id: "world-market-summary",
    tag: "tv-world-market-summary",
    src: "https://widgets.tradingview-widget.com/w/en/tv-world-market-summary.js",
    attributes: {},
  },
  {
    id: "forex-table",
    tag: "tv-forex-table",
    src: "https://widgets.tradingview-widget.com/w/en/tv-forex-table.js",
    attributes: {},
  },
  {
    id: "screener",
    tag: "tv-screener",
    src: "https://widgets.tradingview-widget.com/w/en/tv-screener.js",
    attributes: {
      "screener-type": "stock",
      columns: "overview",
      screen: "most_capitalized",
    },
  },
];

export default function TradingViewDashboardWidgets() {
  const widgetsRef = useRef(null);

  useEffect(() => {
    const root = widgetsRef.current;
    if (!root) return undefined;

    WIDGETS.forEach((widget) => {
      const mount = root.querySelector(`[data-widget="${widget.id}"]`);
      if (!mount) return;

      const element = document.createElement(widget.tag);
      Object.entries(widget.attributes).forEach(([name, value]) => {
        element.setAttribute(name, value);
      });
      element.style.display = "block";
      element.style.width = "100%";
      if (widget.id === "advanced-chart") {
        element.style.height = "min(68vh, 680px)";
        element.style.minHeight = "480px";
      }
      mount.appendChild(element);

      const existingScript = document.querySelector(
        `script[src="${widget.src}"]`,
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = widget.src;
        document.head.appendChild(script);
      }
    });

    return () => {
      root.querySelectorAll("[data-widget]").forEach((mount) => {
        mount.replaceChildren();
      });
    };
  }, []);

  return (
    <div ref={widgetsRef} className="space-y-6">
      {WIDGETS.map((widget) => (
        <div
          key={widget.id}
          data-widget={widget.id}
          className={
            widget.id === "tickers"
              ? "overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              : "min-h-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900 sm:p-4"
          }
          aria-label={widget.id.replace(/-/g, " ")}
        />
      ))}
    </div>
  );
}
