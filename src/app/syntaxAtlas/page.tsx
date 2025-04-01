// app/page.tsx (Server Component)
import Header from '../components/Header';
import connectToDatabase from '../lib/db/db';
import Snippet from '../lib/db/model/snippet';
import SnippetList from '../components/snippetList';

interface SnippetType {
  _id: string;
  title?: string;
  language: string;
  code: string;
}

export default async function SyntaxAtlas() {
  // Connect to the database and fetch snippets
  await connectToDatabase();
  const snippets: SnippetType[] = (await Snippet.find({}).sort({ createdAt: -1 }).lean() as unknown as SnippetType[]).map((snippet) => ({
    _id: snippet._id.toString(),
    title: snippet.title || undefined,
    language: snippet.language,
    code: snippet.code,
  }));

  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Snippets</h1>
        {/* Pass the fetched snippets to the client component */}
        <SnippetList snippets={snippets} />
      </div>
    </div>
  );
}
