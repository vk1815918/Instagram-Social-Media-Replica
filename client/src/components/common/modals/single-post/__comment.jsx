// components/Comment.js
import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../../profile-card";
import { BiHeart } from "react-icons/bi";
import { format } from "timeago.js";
import LazyImage from "@/components/ui/lazy-image";

const Comment = ({ comment }) => {
  return (
    <li className="w-full ">
      <ul className="flex items-start gap-2">
        <ProfileCard
          username={comment?.user?.username}
          avatarUrl={comment?.user?.profilePicture}
          withUsername={false}
          withVerified={false}
          avatarClassName="w-8"
        />

        <li className="flex-1 flex flex-col">
          <div className="text-[13px] leading-none">
            <ProfileCard
              username={comment.user?.username}
              withUsername
              withVerified
              verified={comment.user?.verified}
              usernameClassName={"text-[17px]"}
            />
            {comment.gif ? (
              <GifComment comment={comment} />
            ) : (
              <TextComment comment={comment} />
            )}
          </div>

          <div className="opacity-70 space-x-2 ">
            <span className="text-xs">{format(comment.createdAt)}</span>
            <span className="text-xs">0 likes</span>
            <span className="text-xs cursor-pointer">Reply</span>
          </div>
        </li>

        <li>
          <BiHeart className="text-sm mt-2 cursor-pointer " />
        </li>
      </ul>
    </li>
  );
};

export default Comment;

const TextComment = ({ comment }) => {
  const mentionRegex = /@(\w+)/g;
  const parts = comment?.text.split(mentionRegex);

  return (
    <p className="text-[15px] leading-tight">
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <Link
              to={`/${part}/`}
              key={index}
              className="text-[15px] leading-tight text-[#29be00] hover:underline transition-all"
            >
              @{part}
            </Link>
          );
        }

        return part;
      })}
    </p>
  );
};

const GifComment = ({ comment }) => {
  return <LazyImage src={comment.gif} alt="GIF" />;
};
