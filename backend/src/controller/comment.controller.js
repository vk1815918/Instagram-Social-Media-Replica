import tryCatch from "../utils/tryCatch.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { pushNewNotification } from "../helper/push-notification.js";

const postNewComment = tryCatch(async (req, res, next) => {
  const postId = req.params.postId;
  const authId = req.userDoc._id;
  const { text, gifUrl } = req.body;

  console.log(gifUrl);
  const postDoc = await Post.findById(postId);
  if (!postDoc) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (!text && !gifUrl) {
    throw new Error("Write Comment First");
  }

  if (gifUrl) {
    const commentDoc = await Comment.create({
      gif: gifUrl,
      user: authId,
    });

    // Don't push notification if owner comment on his/her own post!
    if (postDoc.user.toString() !== authId.toString()) {
      await pushNewNotification(
        authId,
        "new_comment",
        postDoc.user,
        postDoc._id
      );
    }

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: commentDoc._id },
    });
    res.status(201).json({ message: "Gif Posted Successfully" });
    return;
  }

  // Identify mentioned users
  const mentionRegex = /@(\w+)/g;
  const mentionedUsernames = [];
  let match;
  while ((match = mentionRegex.exec(text)) !== null) {
    mentionedUsernames.push(match[1]);
  }

  // Find mentioned users
  const mentionedUsers = await User.find({
    username: { $in: mentionedUsernames },
  });

  for (const user of mentionedUsers) {
    await pushNewNotification(authId, "comment_mention", user._id, postId);
  }

  const commentDoc = await Comment.create({
    text,
    user: authId,
  });

  // Don't push notification if owner comment on his/her own post!
  if (postDoc.user.toString() !== authId.toString()) {
    await pushNewNotification(authId, "new_comment", postDoc.user, postDoc._id);
  }

  await Post.findByIdAndUpdate(postId, { $push: { comments: commentDoc._id } });
  res.status(201).json({ message: "Comment Post Successfully" });
});

const deleteComment = tryCatch(async (req, res, next) => {
  const authId = req.userDoc._id;
  const commentId = req.params.commentId;
  const postId = req.body.postId;

  await Comment.findByIdAndDelete(commentId);
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
  res.json({ message: "Comment Removed Successfully" });
});

const getPostComments = tryCatch(async (req, res, next) => {
  const postId = req.params.postId;

  const postDoc = await Post.findOne({ _id: postId })
    .select("comments")
    .populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "user",
        select: "username profilePicture verified followers",
      },
    });
  const comments = postDoc.comments;
  res.json(comments);
});

const commentController = { postNewComment, deleteComment, getPostComments };
export default commentController;
