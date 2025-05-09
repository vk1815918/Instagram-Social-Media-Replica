import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

// Centralized message lookup for notification types
const notificationMessages = {
  new_follow: "started follow you",
  new_comment: "write comment on your post",
  post_like: "liked your post",
  comment_mention: "You were mentioned in a comment",
  comment_like: "was liked your comment",
  comment_reply: "was replied to your comment",
};

export const pushNewNotification = async (
  user,
  type,
  recipientUserId,
  postId
) => {
  const message = notificationMessages[type] || "new notification";

  const newNotification = await Notification.create({
    user,
    type,
    message,
    post: postId,
  });

  await User.findByIdAndUpdate(recipientUserId, {
    $push: { notifications: newNotification._id },
  });
};
