// "use client";

// import Header from '@/app/components/Header';
// import connectToDatabase from '@/app/lib/db/db';
// import Snippet from "@/app/lib/db/model/snippet";
// import SnippetList from '@/app/components/snippetList';

// interface SnippetType {
//   _id: string;
//   title?: string;
//   language: string;
//   code: string;
// }

// export default async function SyntaxAtlas() {
//   await connectToDatabase();

//   // Fetch and sanitize data
//   const snippetsRaw = await Snippet.find({}, '_id title language code')
//     .sort({ createdAt: -1 })
//     .lean() as unknown as Array<{ _id: any; title?: string; language: string; code: string }>;

//   const snippets: SnippetType[] = snippetsRaw.map((snippet) => ({
//     _id: snippet._id.toString(),
//     title: snippet.title || undefined,
//     language: snippet.language,
//     code: snippet.code,
//   }));

//   return (
//     <div>
//       <Header />
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">All Snippets</h1>
//         <SnippetList snippets={snippets} />
//       </div>
//     </div>
//   );
// }
export default function SyntaxAtlas() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Syntax Atlas</h1>
      <p className="text-lg">Welcome to the Syntax Atlas page!</p>
      <p className="text-lg">Explore code snippets and more.</p>
    </div>
  );
}