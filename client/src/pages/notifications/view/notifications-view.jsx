import React, { useEffect } from "react";
import FollowNotification from "../_components/follow-notification";
import NewCommentNotification from "../_components/comment-notification";
import { useSelector } from "react-redux";
import { useMakeAsReadNotificationsMutation } from "@/api/services/notificationService";
import LikeNotification from "../_components/like-notification";
import MentionNotification from "../_components/mention-notification";
import CommentLikeNotification from "../_components/comment-like";

const NotificationsView = () => {
  const [makeAsReadAllNotifications] = useMakeAsReadNotificationsMutation();
  const { notifications, status } = useSelector((state) => state.notification);

  useEffect(() => {
    makeAsReadAllNotifications();
  }, []);

  const renderSingleNotification = (notification) => {
    switch (notification.type) {
      case "new_follow":
        return (
          <FollowNotification key={notification._id} data={notification} />
        );
      case "new_comment":
        return (
          <NewCommentNotification key={notification._id} data={notification} />
        );
      case "comment_reply":
        return (
          <NewCommentNotification key={notification._id} data={notification} />
        );
      case "comment_mention":
        return (
          <MentionNotification key={notification._id} data={notification} />
        );
      case "post_like":
        return <LikeNotification key={notification._id} data={notification} />;

      case "comment_like":
        return (
          <CommentLikeNotification key={notification._id} data={notification} />
        );
    }
  };

  return (
    <div className="px-6 w-full">
      <header className="pb-4 text-md font-bold">Notifications</header>
      <main className="w-full flex justify-center">
        <div className="w-full sm:w-[80%] xl:w-[55%]">
          {/* Notification container */}
          {status === "loading" ? (
            <div className="py-10 grid place-content-center">Loading...</div>
          ) : notifications?.length === 0 ? (
            <div className="h-[50vh] grid place-content-center">
              <h2 className="text-md">There is no any notifications</h2>
            </div>
          ) : (
            <ul className="w-full flex flex-col gap-2">
              {notifications.map((notification) => {
                return renderSingleNotification(notification);
              })}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default NotificationsView;

// like
// comment
// follow
// mention
