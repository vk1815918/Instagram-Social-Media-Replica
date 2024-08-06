// components/Comment.js
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProfileCard from "../../profile-card";
import { format } from "timeago.js";
import LazyImage from "@/components/ui/lazy-image";
import DeleteCommentButton from "../../buttons/delete-comment-btn";
import ToggleCommentLikeButton from "../../buttons/toggle-comment-like";
import ReplyComment from "./_reply-comment";

const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);

  const handleShowReplies = () => {
    setShowReplies(true);
  };
  const handleHideReplies = () => {
    setShowReplies(false);
  };

  const [_, setSearchParam] = useSearchParams();
  const handleSelectToReply = () => {
    setSearchParam((prev) => {
      prev.set("commentIdToReply", comment._id);
      prev.set("commentUserToReply", comment.user.username);
      return prev;
    });
  };
  
  return (
    <li className="w-full ">
      <div className="flex items-start gap-2">
        <ProfileCard
          username={comment?.user?.username}
          avatarUrl={comment?.user?.profilePicture}
          withUsername={false}
          withVerified={false}
          avatarClassName="w-8"
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

          <div className="space-x-2 ">
            <span className="text-xs opacity-70">
              {format(comment.createdAt)}
            </span>
            <span
              onClick={handleSelectToReply}
              className="text-xs cursor-pointer opacity-70 hover:opacity-100 transition"
            >
              Reply
            </span>
            <DeleteCommentButton
              title="Delete"
              className="text-xs opacity-70 hover:opacity-100 transition"
              commentId={comment._id}
              userId={comment.user._id}
            />
          </div>

          {/* Comment Replies area */}
          <div className="flex flex-col">
            {/* List of a repies comments */}
            <div className="flex flex-col gap-2 mt-2">
              {showReplies &&
                comment?.replies.map((replyComment) => (
                  <ReplyComment comment={replyComment} key={replyComment._id} />
                ))}
            </div>
            {/* Actions to open and close repiles container */}
            {showReplies && (
              <span
                className="text-xs opacity-70 leading-snug cursor-pointer"
                onClick={handleHideReplies}
              >
                hide replies
              </span>
            )}

            {comment?.replies.length > 0 && !showReplies && (
              <span
                className="text-xs opacity-70 leading-snug cursor-pointer"
                onClick={handleShowReplies}
              >
                view {comment?.replies.length || 0} more replies
              </span>
            )}
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
