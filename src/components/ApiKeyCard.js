"use client";

import { useState } from "react";
import { getFullApiKey } from "@/app/dashboard/actions";

export default function ApiKeyCard({ keyPrefix, initialFullKey }) {
  const [showKey, setShowKey] = useState(false);
  const [fullKey, setFullKey] = useState(initialFullKey || null);
  const [fetching, setFetching] = useState(false);
  const [copied, setCopied] = useState(false);

  const maskedKey = keyPrefix
    ? `${keyPrefix}••••••••••••••••••••••••`
    : "••••••••••••••••••••••••••••••••";

  async function handleToggleShow() {
    if (showKey) {
      setShowKey(false);
      return;
    }

    if (!fullKey) {
      setFetching(true);
      const fetchedKey = await getFullApiKey();
      if (fetchedKey) setFullKey(fetchedKey);
      setFetching(false);
    }

    setShowKey(true);
  }

  async function handleCopy() {
    let textToCopy = fullKey;

    if (!textToCopy) {
      setFetching(true);
      textToCopy = await getFullApiKey();
      if (textToCopy) setFullKey(textToCopy);
      setFetching(false);
    }

    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy API key:", err);
    }
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-3">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
        Your API key
      </h3>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-slate-50/80 dark:bg-gray-800/50 p-2 border border-slate-100 dark:border-gray-800">
        {/* Key Display */}
        <code className="flex-1 truncate px-3 py-1 text-xs font-mono text-slate-800 dark:text-slate-200 select-all">
          {fetching ? (
            <span className="text-slate-400">Loading key…</span>
          ) : showKey && fullKey ? (
            fullKey
          ) : (
            maskedKey
          )}
        </code>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            disabled={fetching}
            onClick={handleToggleShow}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
          >
            {showKey ? "Hide" : "Show"}
          </button>

          <button
            type="button"
            disabled={fetching}
            onClick={handleCopy}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition active:scale-95 disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}