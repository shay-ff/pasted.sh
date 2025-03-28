"use client";
import Header from "@/app/components/Header";
import SnippetForm from "@/app/components/Configure";
import CodeEditor from "@/app/components/Editor/CodeEditor";
import { LanguageProvider } from "@/app/middleware/LanguageContext";
import { CodeProvider } from "@/app/middleware/codeContext";

export default function Home() {
  return (
    <LanguageProvider>
      <CodeProvider>
        <div className="flex flex-col min-h-screen bg-[#0d1117] text-[#c9d1d9]">
          <Header />
          <div className="flex flex-col lg:flex-row flex-1 p-6 gap-6 items-start">
            <div className="flex-1 min-h-[70vh]">
              <CodeEditor />
            </div>
            <div className="m-3 border border-[#30363d] w-80">
              <SnippetForm />
            </div>
          </div>
        </div>
      </CodeProvider>
    </LanguageProvider>
  );
}
