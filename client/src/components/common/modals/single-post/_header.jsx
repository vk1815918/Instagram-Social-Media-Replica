import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import ProfileCard from "../../profile-card";

const Header = ({ post }) => {
  return (
    <li className="h-[40px] ">
      <ul className="w-full flex justify-between items-center">
        <div className="flex items-center gap-1 ">
          <ProfileCard
            username={post?.user?.username}
            avatarUrl={post?.user?.profilePicture}
            withUsername
            withVerified
            verified={post?.user?.verified}
            avatarClassName="w-8"
          />
        </div>
        <li>
          <span className="cursor-pointer ">
            <FiMoreHorizontal className="text-xl" />
          </span>
        </li>
      </ul>
    </li>
  );
};

export default Header;
