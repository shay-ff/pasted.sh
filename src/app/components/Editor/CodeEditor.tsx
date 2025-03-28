"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { useLanguage } from "@/app/middleware/LanguageContext";
import { languageConfiguration, monarchLanguage } from "@/app/components/Editor/customLanguage";
import { useCode } from "@/app/middleware/codeContext";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function CodeEditor() {
  const languageContext = useLanguage();
  const codeContext = useCode();
  const language = languageContext ? languageContext.language : "plaintext";
  const [code, setCode] = useState("// Start coding here...");

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      if (codeContext && codeContext.setCode) {
        codeContext.setCode(value);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("monaco-editor").then((monaco) => {
        monaco.languages.setLanguageConfiguration(language, languageConfiguration);
        monaco.languages.setMonarchTokensProvider(language, monarchLanguage);

        monaco.editor.defineTheme("github-dark", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "keyword", foreground: "80cbc4", fontStyle: "bold" },
            { token: "keyword.type", foreground: "4dd0e1" },
            { token: "string", foreground: "ffab40" },
            { token: "number", foreground: "aed581" },
            { token: "comment", foreground: "6a737d" },
            { token: "identifier", foreground: "c9d1d9" },
            { token: "operator", foreground: "80cbc4" },
          ],
          colors: {
            "editor.background": "#161b22", // Editor background color
            "editor.foreground": "#c9d1d9",
            "editor.lineHighlightBackground": "#161b22",
            "editorCursor.foreground": "#c9d1d9",
            "editor.selectionBackground": "#30363d",
            "editor.inactiveSelectionBackground": "#0d1117",
          },
        });

        // Explicitly apply the theme
        monaco.editor.setTheme("github-dark");
      });
    }
  }, [language]);

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-[#161b22] px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-[#c9d1d9]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.707 3.293a1 1 0 10-1.414 1.414L6.586 11l-2.293 2.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414l-3-3zM11 13a1 1 0 100-2h3a1 1 0 100 2h-3z" />
        </svg>
        <span className="text-[#c9d1d9] font-mono text-sm flex-1 text-center">
          Create a new snippet by pasting or typing your code below.
        </span>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 p-4 bg-[#1E1E1E]">
        <Editor
          height="65vh"
          width="100%"
          language={language}
          value={code}
          theme="github-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            scrollBeyondLastLine: false,
            lineNumbersMinChars: 2,
            lineDecorationsWidth: 10,
          }}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
}
