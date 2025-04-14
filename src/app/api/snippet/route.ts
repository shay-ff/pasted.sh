import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db/db";
import Snippet from "@/app/lib/db/model/snippet";
import { NextRequest } from "next/server";

const timeMap: Record<string, number | null> = {
  once: 0,      // or whatever value represents "burn after read"
  '5m': 300,
  '15m': 900,
  '30m': 1800,
  '1h': 3600,
  '10h': 36000,
  '24h': 86400,
  never: null,
};

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    // console.log(connectToDatabase);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("_id");

    if (id) {
      // console.log(`Fetching snippet with id: ${id}`);
      const snippet = await Snippet.findById(id);

      if (!snippet) {
        return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
      }

      // console.log("Snippet found:", snippet);
      return NextResponse.json(snippet);
    } else {
      // console.log("Fetching all snippets...");
      const snippets = await Snippet.find().sort({ createdAt: -1 });

      // console.log("Snippets found:", snippets);
      return NextResponse.json(snippets);
    }
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return NextResponse.json({ error: "Error fetching snippets" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // console.log(connectToDatabase);
    await connectToDatabase();
    const body = await request.json();
    // console.log("Received Data:", body);  
    
    if (typeof body.expTime === 'string' && body.expTime.toLowerCase() === 'never') {
      body.expTime = null;
    } else {
      body.expTime = timeMap[body.expTime];
    }
    if(!body.code){
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const newSnippet = new Snippet(body);
    const savedSnippet = await newSnippet.save();

    // console.log("Saved Snippet:", savedSnippet); 
    
    return NextResponse.json({ message: "Snippet saved!", snippet: savedSnippet }, { status: 201 });
  } catch (error) {
    console.error("Error saving snippet:", error);
    return NextResponse.json({ error: "Error saving snippet" }, { status: 500 });
  }
}


