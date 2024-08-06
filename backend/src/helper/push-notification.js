import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const pushNewNotification = async (
  user,
  type,
  recipientUserId,
  postId
) => {
  let message;
  switch (type) {
    case "new_follow":
      message = "started follow you";
      break;
    case "new_comment":
      message = "write comment on your post";
      break;
    case "post_like":
      message = "liked your post";
      break;
    case "comment_mention":
      message = "You were mentioned in a comment";
      break;
    case "comment_like":
      message = "was liked your comment";
      break;
    case "comment_reply":
      message = `was replied to your comment`;
      break;
    default:
      message = "new notification";
      break;
  }

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
