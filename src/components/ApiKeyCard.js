"use client";

import { useState } from "react";
import { regenerateApiKey } from "@/app/dashboard/actions";

export default function ApiKeyCard({ keyPrefix, initialFullKey }) {
  const [prefix, setPrefix] = useState(keyPrefix);
  const [fullKey, setFullKey] = useState(initialFullKey);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleRegenerate() {
    setLoading(true);
    setConfirmOpen(false);
    const result = await regenerateApiKey();
    setPrefix(result.keyPrefix);
    setFullKey(result.fullKey);
    setCopied(false);
    setLoading(false);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(fullKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 space-y-3">
      <h3 className="font-semibold">Your API key</h3>

      {fullKey ? (
        <div className="space-y-2">
          <p className="text-xs text-amber-600 font-medium">
            Copy this now - for your security we won&apos;t show it again.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs font-mono">
              {fullKey}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 font-medium transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      ) : (
        <code className="block rounded bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs font-mono">
          {prefix}••••••••••••••••••••
        </code>
      )}

      {confirmOpen ? (
        <div className="text-xs space-y-2">
          <p className="text-gray-600 dark:text-gray-400">
            Regenerating revokes your current key immediately - any app using it will stop working. Continue?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleRegenerate}
              disabled={loading}
              className="rounded-lg bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 font-medium transition disabled:opacity-60"
            >
              {loading ? "Regenerating…" : "Yes, regenerate"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="text-xs rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          Regenerate key
        </button>
      )}
    </div>
  );
}
