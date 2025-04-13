// app/snippet/[id]/page.tsx
import { notFound } from "next/navigation";
import SnippetViewer from "./snippetViewer";

type Snippet = {
  _id: string;
  code: string;
  language?: string;
  createdAt?: string;
  expTime?: number | null;
  password?: string | null;
};

async function getSnippet(id: string): Promise<Snippet | null> {
  const res = await fetch(`${process.env.SITE_URL}/api/snippet/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();

  // Check if expired
  if (data.expTime !== null && data.createdAt) {
    const created = new Date(data.createdAt).getTime();
    const expiresAt = created + data.expTime * 1000;
    if (Date.now() > expiresAt) return null;
  }

  return data;
}

export default async function SnippetPage({
  params,
}: {
  params: { id: string };
}) {
  const snippet = await getSnippet(params.id);

  if (!snippet) return notFound();

  return <SnippetViewer snippet={snippet} />;
}
