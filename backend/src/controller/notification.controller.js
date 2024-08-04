import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import tryCatch from "../utils/tryCatch.js";

const getAllNotifications = tryCatch(async (req, res, next) => {
  const authId = req.userDoc._id;
  const userData = await User.findById(authId)
    .select("notifications")
    .populate({
      path: "notifications",
      populate: [
        { path: "user", select: "profilePicture username" },
        { path: "post", select: "src description" },
      ],
    });
  const notifications = userData.notifications.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  res.json(notifications);
});

const makeAsReadNotifications = tryCatch(async (req, res, next) => {
  const authId = req.userDoc._id;
  const userDoc = await User.findById(authId).select("notifications");

  const result = await Notification.updateMany(
    { _id: { $in: userDoc.notifications }, status: { $in: "unread" } },
    { $set: { status: "read" } }
  );

  res.json({ result });
});

const notificationController = { getAllNotifications, makeAsReadNotifications };
export default notificationController;
