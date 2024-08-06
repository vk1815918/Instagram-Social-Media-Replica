import FollowUnfollowActions from "@/components/common/buttons/follow-unfollow-actions";
import ProfileCard from "@/components/common/profile-card";
import React from "react";
import { format } from "timeago.js";

const FollowNotification = ({ data }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ProfileCard
          avatarUrl={data.user?.profilePicture}
          fullName={data.user?.fullName}
          withVerified
          verified={data.user?.verified}
          username={data.user?.username}
          className={"font-bold text-3xl"}
          withUsername={true}
        />
        <h2 className="text-sm line-clamp-1">{data.message}</h2>
        <span className="max-sm:hidden text-sm opacity-75 line-clamp-1">
          {format(data.createdAt)}
        </span>
      </div>

      <FollowUnfollowActions
        accountId={data.user._id}
        followMessage={"Follow back"}
        size="sm"
      />
    </div>
  );
};

export default FollowNotification;
