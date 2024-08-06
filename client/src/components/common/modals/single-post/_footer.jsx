import React from "react";
import TogglePostLike from "../../buttons/toggle-post-like";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { format } from "timeago.js";
import CommentForm from "./_comment-form";

const Footer = ({ post, postID }) => {
  return (
    <li className="pt-4 flex flex-col gap-1">
      <div className="flex flex-col gap-2">
        <div className=" w-100 flex justify-between">
          <div className=" flex gap-4">
            <span className=" hover:scale-110 transition cursor-pointer">
              <TogglePostLike allLikes={post?.likes} postId={post?._id} />
            </span>
            <span className=" hover:scale-110 transition cursor-pointer">
              <FaRegComment className="text-xl" />
            </span>
            <span className=" hover:scale-110 transition cursor-pointer">
              <BsSend className="text-xl" />
            </span>
          </div>
          <div>
            <span className=" hover:scale-110 transition cursor-pointer">
              <FaRegBookmark className="text-xl" />
            </span>
          </div>
        </div>

        <div className="text-xs opacity-75">{format(post?.createdAt)}</div>
      </div>

      <div className="flex flex-col leading-none">
        <h3 className="font-bold text-sm leading-snug">
          {post?.likes?.length || 0} Likes
        </h3>
      </div>

      {/* new comment Input and submit button here */}
      <CommentForm postId={postID} postAuthor={post?.user?._id} />
    </li>
  );
};

export default Footer;
