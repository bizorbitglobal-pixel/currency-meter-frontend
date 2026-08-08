"use client";

import { useState } from "react";
import { updateProfile } from "@/app/dashboard/actions";

export default function ProfileForm({ initialFullName, email }) {
  const [fullName, setFullName] = useState(initialFullName || "");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.set("fullName", fullName);
    await updateProfile(formData);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-500">Email</label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm text-gray-500"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-500">Full name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="text-xs rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 font-medium transition disabled:opacity-60"
      >
        {loading ? "Saving…" : saved ? "Saved!" : "Save changes"}
      </button>
    </form>
  );
}
