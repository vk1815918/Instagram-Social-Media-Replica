// components/CommentForm.js
import React, { useState } from "react";
import { usePostCommentMutation } from "@/api/services/commentServices";
import { MdOutlineGifBox } from "react-icons/md";
import Popover from "../../../ui/popover";
import GifPopoverContent from "./_gif-popover-content";
import MentionPopverContent from "./_mention-popover-content";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");
  const [addComment] = usePostCommentMutation();
  // Popover triggers
  const [gifPopoverTrigger, setGifPopoverTrigger] = useState(false);
  const [mentionPopoverTrigger, setMentionPopverTrigger] = useState(false);

  const [followersFollowing, setFollowersFollowing] = useState([]);
  const [mentionFilterdUsers, setMentionFilterdUsers] = useState([]);
  const handleChange = (e) => {
    setText(e.target.value);

    if (!setFollowersFollowing) return;
    const mentionIndex = e.target.value.lastIndexOf("@");
    if (mentionIndex !== -1) {
      const mentionText = e.target.value
        .substring(mentionIndex + 1)
        .toLowerCase();

      const users = (followersFollowing?.followers || []).concat(
        followersFollowing?.following || []
      );

      const uniqueUsers = Array.from(
        new Set(users.map((user) => user._id))
      ).map((id) => users.find((user) => user._id === id));

      const filteredUsers = uniqueUsers.filter((user) =>
        user.username.toLowerCase().startsWith(mentionText)
      );
      setMentionPopverTrigger(true);
      setMentionFilterdUsers(filteredUsers);
    } else {
      setMentionPopverTrigger(false);
    }
  };

  const handleUserSelect = (username) => {
    const mentionIndex = text.lastIndexOf("@");
    const newText = text.substring(0, mentionIndex + 1) + username + " ";
    setText(newText);
    setMentionPopverTrigger(false);
  };

  const handleSubmit = async (gifUrl) => {
    await addComment({ postId, text });
    setText("");
  };

  return (
    <div className="flex gap-2 items-center w-full relative">
      <Popover
        position="top-left"
        triggerContent={<MdOutlineGifBox className="text-[28px]" />}
        popoverClassName={
          "p-3 z-50 bg-[gray] w-screen sm:w-[400px] h-[500px] sm:h-[400px] overflow-y-scroll"
        }
        triggerIsOpen={gifPopoverTrigger}
      >
        <GifPopoverContent postId={postId} setGifPopoverTrigger={setGifPopoverTrigger}/>
      </Popover>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full flex gap-2 items-center"
      >
        <input
          className="flex-1 peer bg-black/0 focus:border-b-cool-white w-full p-1 text-sm transition border-none outline-none"
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

      {/* mentions popover */}
      <Popover
        position="top-right"
        popoverClassName={
          "p-3 z-[100] bg-[gray] w-screen sm:w-[400px] h-[500px] sm:h-[400px] overflow-y-scroll"
        }
        triggerIsOpen={mentionPopoverTrigger}
      >
        <MentionPopverContent
          setFollowersFollowing={setFollowersFollowing}
          users={mentionFilterdUsers}
          onUserSelect={handleUserSelect}
        />
      </Popover>
    </div>
  );
};

export default CommentForm;
