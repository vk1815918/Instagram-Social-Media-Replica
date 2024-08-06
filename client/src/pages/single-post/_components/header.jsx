import DeletePostButton from "@/components/common/buttons/delete-post-btn";
import FollowUnfollowActions from "@/components/common/buttons/follow-unfollow-actions";
import ProfileCard from "@/components/common/profile-card";
import { isAuthor } from "@/utils/utils";
import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const Header = ({ post }) => {
  return (
    <li className="w-full">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-1 ">
          <ProfileCard
            username={post?.user?.username}
            avatarUrl={post?.user?.profilePicture}
            withUsername
            withVerified
            verified={post?.user?.verified}
            avatarClassName="w-8"
          />
          <FollowUnfollowActions accountId={post.user._id} />
        </div>

        <div>
          {isAuthor(post.user._id) ? (
            <DeletePostButton
              postId={post._id}
              className={"text-sm bg-red/30 rounded-full"}
            />
          ) : (
            <span className="cursor-pointer ">
              <FiMoreHorizontal className="text-xl" />
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default Header;
