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
      <div className="flex flex-col min-h-screen bg-[#090909] text-white">
        <Header />
        <div className="flex flex-col lg:flex-row flex-1 p-6 gap-6">
          <div className="flex-1 min-h-[70vh]">
            <CodeEditor />
          </div>

          <div className="m-3 border-white border-2 w-80">
            <SnippetForm />
          </div>
        </div>
      </div>
      </CodeProvider>
    </LanguageProvider>
  );
}
