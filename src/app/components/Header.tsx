"use client";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#161b22] text-[#c9d1d9] shadow-md sticky top-0 z-50">
      <Link href="/">
        <div>
          <button className="text-lg font-bold text-[#58a6ff] uppercase tracking-wider hover:text-[#79b8ff]">
            Pasted.sh
          </button>
        </div>
      </Link>

      <div className="flex space-x-4">
        <Link href="/mySnippets">
          <button className="px-4 py-2 text-sm font-medium font-mono bg-[#161b22] border border-[#30363d] rounded-md hover:bg-[#1f6feb] hover:text-white">
            mySnippets
          </button>
        </Link>
        <Link href="/syntaxAtlas">
          <button className="px-4 py-2 text-sm font-medium font-mono bg-[#161b22] border border-[#30363d] rounded-md hover:bg-[#1f6feb] hover:text-white">
            syntaxAtlas
          </button>
        </Link>
      </div>

      <div className="flex space-x-4">
        <button className="px-4 py-2 text-sm font-medium font-mono bg-[#0d1117] border border-[#30363d] rounded-md hover:bg-[#1f6feb] hover:text-white">
          Login
        </button>
        <button className="px-4 py-2 text-sm font-medium font-mono bg-[#0d1117] border border-[#30363d] rounded-md hover:bg-[#f78166] hover:text-white">
          Register
        </button>
      </div>
    </div>
  );
}
