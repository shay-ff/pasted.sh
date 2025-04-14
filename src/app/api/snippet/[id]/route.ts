import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db/db";
import Snippet from "@/app/lib/db/model/snippet";


export async function GET(
  request: NextRequest, 
  context: { params : { id: string } }
) {
  await connectToDatabase();
  const { id } = context.params;
  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    return NextResponse.json(snippet);
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return NextResponse.json({ error: "Error fetching snippet" }, { status: 500 });
  }
}