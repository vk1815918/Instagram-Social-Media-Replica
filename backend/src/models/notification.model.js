import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "new_comment",
        "new_follow",
        "post_like",
        "comment_mention",
        "comment_reply",
        "comment_like",
      ],
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    status: {
      type: String,
      enum: ["read", "unread"],
      default: "unread",
    },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);
export default Notification;
