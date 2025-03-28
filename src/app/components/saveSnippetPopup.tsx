import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface PopupProps {
  snippetLink: string;
  onClose: () => void; 
}

export default function SnippetSavedPopup({ snippetLink, onClose }: PopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Popup container */}
      <div className="bg-[#141414] rounded-lg shadow-lg p-8 w-full max-w-md mx-4 text-center relative">
        {/* Close button (optional) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          aria-label="Close"
        >
          &times;
        </button>
        
        {/* Green check icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500" size={48} />
        </div>

        {/* Success message */}
        <h2 className="text-2xl font-semibold text-white mb-2">
          Pasted snippet successfully saved!
        </h2>

        {/* Permalink display */}
        <div className="mt-4 text-white">
          <span className="font-semibold">Permalink:</span>{" "}
          <a
            href={snippetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline break-all"
          >
            {snippetLink}
          </a>
        </div>

        {/* Create New button */}
        <div className="mt-6">
          <button
            onClick={() => {
              // e.g. navigate to a "create new snippet" page, then close popup
              <Link href="@/app/page.tsx">
                Create New Snippet
              </Link>
              onClose();
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create New
          </button>
        </div>
      </div>
    </div>
  );
}
