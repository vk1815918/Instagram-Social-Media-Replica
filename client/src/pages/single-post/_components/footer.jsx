import React, { useState } from "react";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { format } from "timeago.js";
import CommentForm from "./_comment-form";
import TogglePostLike from "@/components/common/buttons/toggle-post-like";
import { handleShowModal } from "@/handler/modal-handlers";
import { useSearchParams } from "react-router-dom";
import { textSlicer } from "@/utils/text";
import PostTextRender from "@/utils/post-text-render";

const Footer = ({ post, postID }) => {
  const [_, setSearchParams] = useSearchParams();

  const handleOpenSinglePostModal = () => {
    setSearchParams({ p: postID });
    handleShowModal("singlePost");
  };

  return (
    <li className="w-full py-3 flex flex-col gap-1">
      <div className="flex flex-col gap-2">
        <div className=" w-100 flex justify-between">
          <div className=" flex gap-4">
            <span className=" hover:scale-110 transition cursor-pointer">
              <TogglePostLike allLikes={post?.likes} postId={post?._id} />
            </span>
            {/* For small device */}
            <span
              className="md:hidden hover:scale-110 transition cursor-pointer"
              onClick={handleOpenSinglePostModal}
            >
              <FaRegComment className="text-xl" />
            </span>

            {/* for large screen */}
            <span className="max-md:hidden hover:scale-110 transition cursor-pointer">
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
          {post.likes.length} Likes
        </h3>
      </div>

      <PostTextRender text={post.caption} className={"text-sm"} limit={60} />
      
      {/* new comment Input and submit button here */}
      <CommentForm postId={postID} />
    </li>
  );
};

export default Footer;
