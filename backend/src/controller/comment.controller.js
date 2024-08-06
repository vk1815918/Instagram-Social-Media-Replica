import tryCatch from "../utils/tryCatch.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { pushNewNotification } from "../helper/push-notification.js";
import { extractMentions } from "../helper/text.js";

const postNewComment = tryCatch(async (req, res, next) => {
  const postId = req.params.postId;
  const authId = req.userDoc._id;

  const { text, gifUrl } = req.body;
  const parentComment = req.body.parentComment;

  // find current post
  const postDoc = await Post.findById(postId);
  if (!postDoc) {
    res.status(404);
    throw new Error("Post not found");
  }

  // check text or gif is sended from client
  if (!text && !gifUrl) {
    res.status(400);
    throw new Error("Write Comment First");
  }

  // check the comment is gif or text comment
  const commentDoc = await Comment.create({
    text,
    gif: gifUrl,
    user: authId,
    post: postDoc._id,
  });

  if (!!parentComment) {
    const parentCommentDoc = await Comment.findById(parentComment);
    commentDoc.parentComment = parentComment;
    await commentDoc.save();

    parentCommentDoc.replies.push(commentDoc._id);
    await parentCommentDoc.save();
  }

  //push notification for post owner but Don't push notification if owner comment on his/her own post!
  if (postDoc.user.toString() !== authId.toString()) {
    const parentCommentDoc = await Comment.findById(parentComment);

    await pushNewNotification(
      authId,
      parentComment ? "comment_reply" : "new_comment",
      parentComment ? parentCommentDoc.user : postDoc.user,
      postDoc._id
    );
  }

  // Identify mentioned users if the comment is text
  const mentionedUsernames = extractMentions(text);

  // after idetifing mentions push notifications for all mentioned users
  if (mentionedUsernames.length !== 0) {
    // Find mentioned users
    const mentionedUsers = await User.find({
      username: { $in: mentionedUsernames },
    });

    // push new notification for all mentioned users
    for (const user of mentionedUsers) {
      await pushNewNotification(authId, "comment_mention", user._id, postId);
    }
  }

  await Post.findByIdAndUpdate(postId, { $push: { comments: commentDoc._id } });
  res.status(201).json({ message: "Comment Post Successfully" });
});

// Access by post author and comment writer
const deleteComment = tryCatch(async (req, res, next) => {
  const authId = req.userDoc._id;
  const commentId = req.params.commentId;
  const postId = req.body.postId;

  const commentDoc = await Comment.findById(commentId);
  const canDeleteComment = commentDoc.user.toString() === authId.toString();

  if (!canDeleteComment) {
    res.status(403);
    throw new Error("You can't delete this comment");
  }

  await Comment.findByIdAndDelete(commentId);
  await Post.findByIdAndUpdate(postId, {
    $pull: { comments: commentDoc._id },
  });
  res.json({ message: "Comment Removed Successfully" });
});

const getPostComments = tryCatch(async (req, res, next) => {
  const postId = req.params.postId;

  const comments = await Comment.find({
    post: postId,
    parentComment: null,
  })
    .populate([
      {
        path: "user",
        select: "username profilePicture verified",
      },
      {
        path: "replies",
        populate: {
          path: "user",
          select: "username profilePicture verified",
        },
      },
    ])
    .sort({ createdAt: -1 });

  res.json(comments);
});

const toggleCommentLike = tryCatch(async (req, res, next) => {
  const commentId = req.params.commentId;
  const authId = req.userDoc._id;

  const commentDoc = await Comment.findById(commentId);
  const postDoc = await Post.findById(commentDoc.post).select("user");

  const isUserLikeThisComment = commentDoc.likes.some((userId) => {
    return userId.toString() === authId.toString();
  });

  // If user not liked make like and push user id to comment likes
  if (!isUserLikeThisComment) {
    await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: { likes: authId },
      },
      { new: true }
    );

    // Don't push notification if owner comment on his/her own post!
    if (commentDoc.user.toString() !== authId.toString()) {
      await pushNewNotification(
        authId,
        "comment_like",
        commentDoc.user,
        postDoc._id
      );
    }
    res.json({ success: true });
    return;
  }

  // else user liked remove user like from the comment
  await Comment.findByIdAndUpdate(
    commentId,
    {
      $pull: { likes: authId },
    },
    { new: true }
  );
  res.status(200).json({ success: true });
});

const commentController = {
  postNewComment,
  deleteComment,
  getPostComments,
  toggleCommentLike,
};
export default commentController;
