import { Schema, model } from "mongoose";

const storySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], required: true },
    caption: { type: String },
    expiresAt: { type: Date, required: true },
    viewers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Story = model("Story", storySchema);
export default Story;
