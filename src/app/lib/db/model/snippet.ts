//app/lib/db/model/snippet.ts
import mongoose, { Schema } from "mongoose";
import { nanoid } from "nanoid";
// Define TypeScript Interface for Snippet
type Preferences = Record<string, unknown>;

interface ISnippet {
  // snippetId: string;
  _id: string;
  code: string;
  language: string;
  title?: string | null;
  description?: string | null;
  password?: string | null  ;
  createdAt?: Date | null;
  expTime?: number | null; // Store as seconds (e.g., 86400 for 24h)
  preferences?: Preferences;
  showOnAtlas?: boolean;
}

// Define Mongoose Schema
const SnippetSchema = new Schema<ISnippet>(
  {
    _id: { type: String, default: () => nanoid(14) },
    code: { type: String, required: true },
    language: { type: String, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    password: { type: String, required: false },
    expTime: { type: Number, required: false }, 
    preferences: { type: Schema.Types.Mixed },
    showOnAtlas: { type: Boolean, default: true },
  },
  { timestamps: true } // Auto-add createdAt and updatedAt
);

// Prevent model overwrite in Next.js
const Snippet = mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", SnippetSchema);

export { Snippet as default, type ISnippet };
