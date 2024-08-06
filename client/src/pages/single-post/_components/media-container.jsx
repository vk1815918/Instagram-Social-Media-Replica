import VideoPlayer from "@/components/common/video-player";
import React from "react";

const MediaContainer = ({ post }) => {
  return (
    <div className="w-full h-[90vh] overflow-hidden ">
      {post?.type === "post" ? (
        <img
          src={post?.src}
          className=" inset-0 min-w-full min-h-full max-w-[100%] max-h-[100%] object-cover group-hover:scale-125 transition-all"
          alt="Post"
        />
      ) : (
        <VideoPlayer
          src={post.src}
          videoClassName=" object-contain w-full transition-all"
          alt="Reel"
        />
      )}
    </div>
  );
};

export default MediaContainer;
