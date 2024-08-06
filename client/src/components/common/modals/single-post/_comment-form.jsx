// components/CommentForm.js
import React, { useEffect, useRef, useState } from "react";
import { usePostCommentMutation } from "@/api/services/commentServices";
import { MdOutlineGifBox } from "react-icons/md";
import Popover from "@/components/ui/popover";
import GifPopoverContent from "./_gif-popover-content";
import { useSearchParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");
  const inputRef = useRef();
  const [addComment] = usePostCommentMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const commentIdToReply = searchParams.get("commentIdToReply") || "";
  const commentUserToReply = searchParams.get("commentUserToReply") || "";

  // Popover triggers
  const [gifPopoverTrigger, setGifPopoverTrigger] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (commentIdToReply) {
      inputRef.current.focus();
    }
  }, [commentIdToReply]);

  const handleRemoveSelectedReply = () => {
    setSearchParams((prev) => {
      prev.delete("commentIdToReply");
      return prev;
    });
  };

  const handleSubmit = async () => {
    await addComment({ postId, text, parentComment: commentIdToReply });
    setSearchParams((prev) => {
      prev.delete("commentIdToReply");
      return prev;
    });
    setText("");
  };

  return (
    <div className="flex flex-col w-full">
      {commentIdToReply && (
        <div className="w-full flex justify-between items-center my-2 px-2 py-2 bg-[gray]/40">
          <p className="text-xs opacity-80">Replying to {commentUserToReply}</p>
          <span className="cursor-pointer" onClick={handleRemoveSelectedReply}>
            <IoClose />
          </span>
        </div>
      )}

      <div className="w-full flex items-center gap-2 relative">
        <Popover
          position="top-left"
          triggerContent={<MdOutlineGifBox className="text-[28px]" />}
          popoverClassName={
            "p-3 z-50 bg-[gray] w-screen sm:w-[400px] h-[500px] sm:h-[400px] overflow-y-scroll"
          }
          triggerIsOpen={gifPopoverTrigger}
        >
          <GifPopoverContent
            postId={postId}
            setGifPopoverTrigger={setGifPopoverTrigger}
          />
        </Popover>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full flex gap-2 items-center"
        >
          <input
            className="flex-1 peer bg-black/0 focus:border-b-cool-white w-full p-1 text-sm transition border-none outline-none"
            ref={inputRef}
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Add a comment..."
          />
          <button
            onClick={handleSubmit}
            className="cursor-pointer text-[#3dffd2] text-sm hover:text-white transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
