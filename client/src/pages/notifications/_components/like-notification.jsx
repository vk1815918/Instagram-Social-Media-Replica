import ProfileCard from "@/components/common/profile-card";
import { CustomNavigator } from "@/handler/navigator";
import React from "react";
import { BsHeartFill } from "react-icons/bs";
import { format } from "timeago.js";

const LikeNotification = ({ data }) => {
  return (
    <div className="w-full flex items-center justify-between rounded-2xl">
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

      <div className="flex items-center gap-2">
        <BsHeartFill className="text-red text-[13px]" />
        <CustomNavigator
          to={`/p/${data?.post?._id}`}
          className="text-sm cursor-pointer"
        >
          see
        </CustomNavigator>
      </div>
    </div>
  );
};

export default LikeNotification;
