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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {snippets.map((snippet) => (
        <SnippetItem key={snippet._id} snippet={snippet} />
      ))}
    </div>
  );
}

function SnippetItem({ snippet }: { snippet: SnippetType }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="p-4 rounded bg-gray-900 text-gray-100 shadow-sm">
      <h2 className="text-lg font-medium text-gray-300">
        {snippet.title || 'Untitled'}
      </h2>
      <p className="text-xs text-gray-500 mt-1">Language: {snippet.language}</p>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="mt-3 px-3 py-1 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 transition"
      >
        {isVisible ? "Hide Snippet" : "Show Snippet"}
      </button>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-gray-800 rounded w-full max-w-2xl max-h-[80vh] overflow-auto p-6">
            <h2 className="text-lg font-medium text-gray-300 mb-4">
              {snippet.title || 'Untitled'}
            </h2>
            <pre className="p-4 bg-gray-900 rounded text-xs overflow-auto max-h-[50vh] whitespace-pre-wrap">
              {snippet.code}
            </pre>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => navigator.clipboard.writeText(snippet.code)}
                className="px-4 py-1 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition"
              >
                Copy
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="px-4 py-1 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
