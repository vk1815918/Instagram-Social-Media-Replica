import React from "react";
import Avatar from "./avatar";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const ProfileCard = ({
  avatarUrl,
  username,
  verified,
  withUsername,
  withVerified,
  className,
  avatarClassName,
  fullName,
  fullNameClassName,
  usernameClassName,
  withNavigator = true,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer text-sm ${className}`}
      onClick={() => withNavigator && navigate(`/${username}/`)}
    >
      {avatarUrl && (
        <Avatar src={avatarUrl} className={twMerge(`w-8 ${avatarClassName}`)} />
      )}

      <div className="flex items-center gap-1">
        <div className="flex flex-col ">
          {withUsername && (
            <div className="flex gap-1 items-center">
              <h3 className={twMerge(usernameClassName)}>{username}</h3>
              {withVerified && verified && (
                <MdVerified className="text-[#1ab3ff] text-md " />
              )}
            </div>
          )}
          {fullName && <h3 className={fullNameClassName}>{fullName}</h3>}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
