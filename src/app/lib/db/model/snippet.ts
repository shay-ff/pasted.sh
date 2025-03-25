import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript Interface for Snippet
type Preferences = Record<string, unknown>;

interface ISnippet extends Document {
  code: string;
  language: string;
  title: string | null;
  description?: string | null;
  password?: string | null  ;
  expTime?: number; // Store as seconds (e.g., 86400 for 24h)
  preferences?: Preferences;
}

// Define Mongoose Schema
const SnippetSchema = new Schema<ISnippet>(
  {
    code: { type: String, required: true },
    language: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    password: { type: String },
    expTime: { type: Number }, // Store time in seconds
    preferences: { type: Schema.Types.Mixed },
  },
  { timestamps: true } // Auto-add createdAt and updatedAt
);

// Prevent model overwrite in Next.js
const Snippet = mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", SnippetSchema);

export default Snippet;
