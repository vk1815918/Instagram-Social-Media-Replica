// components/Comment.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../../profile-card";
import { format } from "timeago.js";
import LazyImage from "@/components/ui/lazy-image";
import DeleteCommentButton from "../../buttons/delete-comment-btn";
import ToggleCommentLikeButton from "../../buttons/toggle-comment-like";

const ReplyComment = ({ comment }) => {
  return (
    <div className="w-full">
      <div className="flex items-start">
        <ProfileCard
          username={comment?.user?.username}
          avatarUrl={comment?.user?.profilePicture}
          withUsername={false}
          withVerified={false}
          avatarClassName="w-6 "
        />

        <div className="flex-1 flex flex-col">
          <div className="text-[13px] leading-none">
            <ProfileCard
              username={comment.user?.username}
              withUsername
              withVerified
              verified={comment.user?.verified}
              usernameClassName={"text-[15px] leading-none"}
            />

            <div className="mt-1">
              {comment.gif ? (
                <GifComment comment={comment} />
              ) : (
                <TextComment comment={comment} />
              )}
            </div>
          </div>

          <div className="space-x-2">
            <span className="text-xs opacity-70">
              {format(comment.createdAt)}
            </span>
            <DeleteCommentButton
              title="Delete"
              className="text-xs opacity-70 hover:opacity-100 transition"
              commentId={comment._id}
              userId={comment.user._id}
            />
          </div>
        </div>

        <div className="flex flex-col items-center ">
          <ToggleCommentLikeButton
            allLikes={comment?.likes || []}
            commentId={comment._id}
          />
          <span className="text-xs opacity-70 leading-snug">
            {comment.likes.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;

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
