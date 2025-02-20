"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { useLanguage } from "../middleware/LanguageContext";
import { languageConfiguration, monarchLanguage } from "./customLanguage";

const Editor = dynamic(() => import("@monaco-editor/react"), {ssr: false,
});

export default function CodeEditor() {
  const languageContext = useLanguage(); 
  const language = languageContext ? languageContext.language : "cpp"; // case handled if languageContext is undefined
  const [code, setCode] = useState("// Start coding here...");

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure this only runs in the client
        import("monaco-editor").then((monaco) => {
          monaco.languages.setLanguageConfiguration(language, languageConfiguration);
          monaco.languages.setMonarchTokensProvider(language, monarchLanguage);

          monaco.editor.defineTheme("custom-theme", {
            base: "vs-dark",
            inherit: true,
            rules: [
              { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
              { token: "keyword.type", foreground: "4EC9B0" },
              { token: "string", foreground: "CE9178" },
              { token: "number", foreground: "B5CEA8" },
              { token: "comment", foreground: "6A9955" },
              { token: "identifier", foreground: "9CDCFE" },
              { token: "operator", foreground: "D4D4D4" },
            ],
            colors: {
              "editor.background": "#1E1E1E",
              "editor.foreground": "#D4D4D4",
              "editor.lineHighlightBackground": "#2D2D2D",
              "editorCursor.foreground": "#FFFFFF",
              "editor.selectionBackground": "#264F78",
              "editor.inactiveSelectionBackground": "#3A3D41",
            },
        });
      });
    }
  }, [language]); // Re-run when language changes

  return (
    <div className="flex flex-col w-full bg-[#1e1e1e]">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-[#252526] px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-[#858585]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.707 3.293a1 1 0 10-1.414 1.414L6.586 11l-2.293 2.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414l-3-3zM11 13a1 1 0 100-2h3a1 1 0 100 2h-3z" />
        </svg>
        <span className="text-gray-300 font-mono text-sm flex-1 text-center">
          Create a new snippet by pasting or typing your code below.
        </span>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 p-4">
        <Editor
          height="65vh"
          width="100%"
          language={language}
          value={code}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
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
