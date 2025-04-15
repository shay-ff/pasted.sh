'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import { Card } from '@/app/components/ui/cards';
import Link from 'next/link';
import { ISnippet } from '../lib/db/model/snippet';

type Snippet = {
  id: string;
  title: string;
  language: string;
  createdAt: string | null;
  expTime: string;
  preview: string;
};

async function fetchSnippetsFromAPI(): Promise<Snippet[]> {
  const res = await fetch('/api/snippet/delete-expired', { method: 'DELETE' });
  const data = await res.json();

  return data.snippets
  .filter((s: ISnippet) => s.showOnAtlas !== false)
  .map((s: ISnippet) => ({
    id: s._id,
    code: s.code,
    title: s.title || 'Untitled',
    language: s.language || 'Unknown',
    createdAt: s.createdAt ? new Date(s.createdAt).toISOString() : null,
    expTime: s.expTime === null ? 'Never' : `${s.expTime} seconds`,
    preview: s.code.split('\n').slice(0, 3).join('\n'),
  }));
}

function SnippetCard({ snippet }: { snippet: Snippet }) {
  const trimmedPreview = snippet.preview.trim();
  return (
    <Link
      href={`/snippet/${snippet.id}`}
      className="block bg-[#131316] border border-[#2a2a2e] rounded-xl p-6 hover:border-blue-600 transition-shadow hover:shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-2 text-white truncate">
        {snippet.title}
      </h2>

      <div className="mb-3 text-gray-400 text-sm">
        <p>
          <span className="font-medium text-white">Language:</span> {snippet.language}
        </p>
        <p>
          <span className="font-medium text-white">Created:</span>{' '}
          {snippet.createdAt ? new Date(snippet.createdAt).toLocaleString() : 'Unknown'}
        </p>
        <p>
          <span className="font-medium text-white">Expires:</span> {snippet.expTime}
        </p>
      </div>

      <pre className="text-gray-300 text-sm bg-[#1a1a1d] p-3 rounded-md overflow-hidden whitespace-pre-wrap leading-relaxed max-h-24">
        {trimmedPreview} {trimmedPreview.split('\n').length >= 3 && '...'}
      </pre>
    </Link>
  );
}

export default function SyntaxAtlasContent() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSnippets = async () => {
    setLoading(true);
    const data = await fetchSnippetsFromAPI();
    setSnippets(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  return (
    <div>
      <Header />
      <Card className="w-full h-full bg-[#1a1a1d] border border-[#2a2a2e] rounded-xl p-8 shadow-lg">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-semibold mb-2">All Snippets</h1>
            <p className="text-gray-400">Browse all the snippets available in the Syntax Atlas.</p>
          </div>
          <button
            onClick={fetchSnippets}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {snippets.length === 0 && (
            <p className="text-gray-500">No snippets found.</p>
          )}
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      </Card>
    </div>
  );
}
