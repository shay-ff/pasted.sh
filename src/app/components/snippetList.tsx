// components/SnippetList.tsx
"use client";
import { useState } from 'react';

interface SnippetType {
  _id: string;
  title?: string;
  language: string;
  code: string;
}

interface SnippetListProps {
  snippets: SnippetType[];
}

export default function SnippetList({ snippets }: SnippetListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {snippets.map((snippet) => (
        <SnippetItem key={snippet._id} snippet={snippet} />
      ))}
    </div>
  );
}

function SnippetItem({ snippet }: { snippet: SnippetType }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="p-4 border rounded shadow bg-[#0F2424] text-[#FAFAFA]">
      <h2 className="text-xl font-semibold text-[#FF7F50]">
        {snippet.title || 'Untitled'}
      </h2>
      <p className="text-sm text-gray-300">Language: {snippet.language}</p>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="mt-2 px-3 py-1 bg-[#FF7F50] text-[#FAFAFA] rounded hover:bg-[#FF6F61] transition"
      >
        {isVisible ? "Hide Snippet" : "Show Snippet"}
      </button>
      {isVisible && (
        <div className="mt-2">
          <pre className="p-2 bg-[#0B3C3B] rounded text-sm overflow-auto">
            {snippet.code}
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(snippet.code)}
            className="mt-2 px-3 py-1 bg-[#FF7F50] text-[#FAFAFA] rounded hover:bg-[#FF6F61] transition"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
