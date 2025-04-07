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
  await connectToDatabase();

  // Query only the required fields to ensure serializability.
  const snippetsRaw = await Snippet.find({}, '_id title language code')
    .sort({ createdAt: -1 })
    .lean();

  const snippets: SnippetType[] = snippetsRaw.map((snippet) => ({
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
        <SnippetList snippets={snippets} />
      </div>
    </div>
  );
}
