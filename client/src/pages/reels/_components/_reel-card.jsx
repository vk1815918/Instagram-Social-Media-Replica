import { useEffect, useRef, useState } from "react";
import { FaMusic } from "react-icons/fa";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { useLocation, useSearchParams } from "react-router-dom";
import ProfileCard from "@/components/common/profile-card";
import TogglePostLike from "@/components/common/buttons/toggle-post-like";
import FollowUnfollowActions from "@/components/common/buttons/follow-unfollow-actions";
import { useDispatch } from "react-redux";
import { showModal } from "@/store/slices/modalSlice";
import VideoPlayer from "@/components/common/video-player";
import { textSlicer } from "@/utils/text";
import PostTextRender from "@/utils/post-text-render";

const ReelCard = ({ reelData }) => {
  const { user, comments, likes, src } = reelData;
  const [seekBarProgress] = useState(0);
  const element = useRef(null);
  const location = useLocation();
  const [_, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();

  // Handle show single post
  const handleShowSinglePost = (id) => {
    setSearchParam((prev) => {
      prev.set("p", id);
      return prev;
    });
    dispatch(showModal({ modalName: "singlePost" }));
  };

  useEffect(() => {
    const allVideos = document.querySelectorAll("#reel-video-player");
    allVideos.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    if (location.pathname === "/reels/") {
      if (allVideos.length >= 1) allVideos[0].play();
    }
  }, [location.pathname]);

  return (
    <div
      ref={element}
      id="single-reel"
      className="w-full min-h-screen sm:min-h-[600px] reel overflow-hidden flex items-center justify-center relative bg-[#1f1f1f]"
    >
      <VideoPlayer src={src} alt="Reel video" forReelPage />

      <div>
        {/* Bottom Contents */}
        <div className="w-full absolute bottom-0 left-0 right-0 flex-flex-col">
          <div className="w-full flex justify-between items-end pl-4 pr-4 pb-4 sm:pb-2">
            {/* Profile and caption container */}
            <div className="flex flex-col gap-2 pb-4">
              <div className="flex items-center gap-2">
                <ProfileCard
                  withUsername
                  withVerified
                  verified={user?.verified}
                  username={user?.username}
                  avatarUrl={user?.profilePicture}
                />
                <FollowUnfollowActions accountId={user?._id} size="sm" />
              </div>

              <div className="flex gap-2 items-center">
                <span>
                  <FaMusic className="text-md" />
                </span>
                <h3 className="text-md">Eprhem Tamiru - gossaye</h3>
              </div>
              <PostTextRender
                text={reelData.caption}
                className={"text-sm"}
                limit={100}
              />
            </div>
            {/*Contaioner That hold Like, Sned, Comment, Saved */}
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-col items-center">
                <span className="cursor-pointer">
                  <TogglePostLike allLikes={likes} postId={reelData._id} />
                </span>
                <span className="text-md">{likes.length}</span>
              </div>
              <div className="flex flex-col items-center">
                <span
                  className="cursor-pointer"
                  onClick={() => handleShowSinglePost(reelData._id)}
                >
                  <FaRegComment className="text-xl" />
                </span>
                <span className="text-md">{comments.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="cursor-pointer">
                  <BsSend className=" text-xl" />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="cursor-pointer">
                  <FaRegBookmark className=" text-xl" />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="cursor-pointer">
                  <FiMoreHorizontal className=" text-xl" />
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{ width: `${seekBarProgress}%` }}
            className={`w-[0%] h-[3px] bg-white transition`}
          />
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
