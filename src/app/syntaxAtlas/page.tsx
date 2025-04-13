import Header from '@/app/components/Header';
import { Card } from '@/app/components/ui/cards';
import connectToDatabase from '@/app/lib/db/db';
import SnippetModel from '@/app/lib/db/model/snippet';
import Link from 'next/link';

async function fetchSnippets() {
  await connectToDatabase();
  const snippets = await SnippetModel.find({ password: '' }).sort({ createdAt: -1 }).lean(); // Filter for snippets where password is an empty string
  return snippets.map((snippet: any) => ({
    id: snippet._id.toString(),
    title: snippet.title || 'Untitled',
    language: snippet.language || 'Unknown',
    createdAt: snippet.createdAt ? snippet.createdAt.toString() : null, // Send raw date
    expTime: snippet.expTime === null ? 'Never' : `${snippet.expTime} seconds`,
    preview: snippet.code.split('\n').slice(0, 3).join('\n'), // Short preview
  }));
}

function SnippetCard({ snippet }: { snippet: any }) {
  const trimmedPreview = snippet.preview.trim(); // Trim the preview
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

export default async function SyntaxAtlas() {
  const snippets = await fetchSnippets();

  return (
    <div>
      <Header />

      <Card className="w-full h-full bg-[#1a1a1d] border border-[#2a2a2e] rounded-xl p-8 shadow-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold mb-2">All Snippets</h1>
          <p className="text-gray-400">
            Browse all the snippets available in the Syntax Atlas.
          </p>
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