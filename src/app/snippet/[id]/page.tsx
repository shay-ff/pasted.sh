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
  console.log("Fetching snippet with ID:", id);
  const res = await fetch(`${process.env.SITE_URL}/api/snippet?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(
      `Failed to fetch snippet with ID ${id}. Status: ${res.status}`
    );
    return null;
  }

  try {
    const data = await res.json();

    // Check if expired
    if (data.expTime !== null && data.createdAt) {
      const created = new Date(data.createdAt).getTime();
      const expiresAt = created + data.expTime * 1000;
      if (Date.now() > expiresAt) return null;
    }

    return data;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}
/*
const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
*/

export default async function SnippetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log("ID:", id);
  const snippet = id ? await getSnippet(id) : null;
  if (!snippet) return notFound();

  return <SnippetViewer snippet={snippet} />;
}
