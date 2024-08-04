import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: process.env.DEFAULT_PROFILE_IMAGE,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification",
        select: false,
      },
    ],
    bio: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      lowercase: true,
      enum: ["", "male", "female"],
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    accountType: {
      type: String,
      enum: ["personal", "business"],
      default: "personal",
    },
    privacy: {
      type: String,
      enum: ["private", "public"],
      default: "public",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
