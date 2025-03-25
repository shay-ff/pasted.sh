import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    language: { type: String, required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    password: { type: String, default: "" },
    expTime: { type: String, default: "never" },
    preferences: {
      indexable: { type: Boolean, default: true },
      comments: { type: Boolean, default: true },
      userOnly: { type: Boolean, default: false },
      encrypt: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Snippet || mongoose.model("Snippet", snippetSchema);


