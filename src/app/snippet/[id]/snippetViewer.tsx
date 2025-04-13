"use client";

import { useState } from "react";

type Snippet = {
  _id: string;
  code: string;
  title?: string;
  language?: string;
  createdAt?: string;
  expTime?: number | null;
  password?: string | null;
};

export default function SnippetViewer({ snippet }: { snippet: Snippet }) {
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [authorized, setAuthorized] = useState(!snippet.password); // Auto-authorize if no password

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === snippet.password) {
      setAuthorized(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  if (snippet.password && !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e0e10] text-white px-4">
        <div className="bg-[#1a1a1d] border border-[#2a2a2e] rounded-lg p-6 w-full max-w-md shadow-lg">
          <h1 className="text-xl font-semibold mb-4">Password Required</h1>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-2 bg-[#0e0e10] border border-gray-600 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter snippet password"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Unlock Snippet
            </button>
          </form>
        </div>
      </div>
    );
  }

  const lines = snippet.code.split("\n");

  return (
    <main className="w-full min-h-screen bg-[#0e0e10] text-white py-10 px-6 lg:px-16">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold mb-2">
          {snippet.title || "Snippet"}
        </h1>
        <div className="relative group">
          <p
            className="text-sm text-gray-400 cursor-pointer hover:text-gray-200"
            onClick={() => {
              navigator.clipboard.writeText(snippet._id);
              const tooltip = document.getElementById("copy-tooltip");
              if (tooltip) {
                tooltip.style.opacity = "1";
                setTimeout(() => {
                  tooltip.style.opacity = "0";
                }, 500);
              }
            }}
          >
            ID: {snippet._id}
          </p>
          <span
            id="copy-tooltip"
            className="absolute left-0 top-full mt-1 text-xs text-white bg-gray-700 px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            Copied!
          </span>
        </div>
      </header>

      <section className="mb-8 bg-[#1f1f23] border border-[#2a2a2e] rounded-xl p-6 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
          <div>
            <p className="font-semibold text-white">Language</p>
            <p>{snippet.language || "Unknown"}</p>
          </div>
          <div>
            <p className="font-semibold text-white">Created</p>
            <p>
              {snippet.createdAt
                ? new Date(snippet.createdAt).toLocaleString()
                : "Unknown"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-white">Expires In</p>
            <p>
              {snippet.expTime === null
                ? "Never"
                : `${snippet.expTime} seconds`}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full overflow-auto border border-[#2a2a2e] rounded-xl bg-[#1a1a1d] shadow-xl">
        <div className="flex font-mono text-sm leading-relaxed">
          <pre className="text-gray-500 py-4 px-6 text-right select-none bg-[#131316] border-r border-[#2a2a2e]">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </pre>
          <pre className="py-4 px-6 whitespace-pre-wrap min-w-0 w-full">
            {snippet.code}
          </pre>
        </div>
      </section>
    </main>
  );
}
