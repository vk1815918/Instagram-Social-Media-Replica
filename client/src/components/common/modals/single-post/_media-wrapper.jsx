import React from "react";
import VideoPlayer from "../../video-player";

const MediaWrapper = ({ post }) => {
  return (
    <div className="bg-[gray]/20 flex items-center h-[100%] overflow-hidden max-sm:hidden relative">
      {post?.type === "post" ? (
        <img
          src={post?.src}
          className="absolute inset-0 min-w-full min-h-full max-w-[110%] max-h-[110%] object-cover group-hover:scale-125 transition-all"
          alt="Post image"
        />
      ) : (
        <VideoPlayer
          src={post.src}
          videoClassName=" object-contain w-full h-full transition-all"
          alt="Reel"
        />
      )}
    </div>
  );
};

export default MediaWrapper;
