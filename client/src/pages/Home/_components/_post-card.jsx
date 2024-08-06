import { useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import VideoPlayer from "@/components/common/video-player";
import { format } from "timeago.js";
import { useSearchParams } from "react-router-dom";
import ProfileCard from "@/components/common/profile-card";
import TogglePostLike from "@/components/common/buttons/toggle-post-like";
import { useDispatch } from "react-redux";
import { showModal } from "@/store/slices/modalSlice";
import FollowUnfollowActions from "@/components/common/buttons/follow-unfollow-actions";
import LazyImage from "@/components/ui/lazy-image";
import PostTextRender from "@/utils/post-text-render";

const PostCard = ({ data }) => {
  const likeAnimationElement = useRef(null);
  const likeAnimationContainer = useRef(null);
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

  // Handling when post card is Double click
  const handleDbPostContainer = (e) => {
    const offesetY = e.nativeEvent.layerY;
    const offesetX = e.nativeEvent.layerX;

    likeAnimationElement.current.style = `top: ${offesetY}px; left: ${offesetX}px; display: block;`;
    setTimeout(() => {
      likeAnimationElement.current.style = `display: none;`;
    }, 500);
  };

  return (
    <>
      <div className="bg-black max-sm:w-full sm:w-[65%] min-h-fit">
        <div className="flex flex-col">
          {/* First Col  */}
          <div className="px-3 flex items-center justify-between w-full h-10">
            {/* Avatar Place */}
            <div className="flex items-center gap-1">
              <ProfileCard
                username={data.user.username}
                avatarUrl={data.user.profilePicture}
                withUsername
                withVerified
                verified={data.user.verified}
                avatarClassName={"w-8"}
              />
              <span className="opacity-75">•</span>
              <h3 className="text-xs/tight opacity-75">
                {format(data.createdAt)}
              </h3>
              <FollowUnfollowActions
                withUnfollowBtn={false}
                accountId={data.user._id}
                size="sm"
              />
            </div>

            <span className="cursor-pointer">
              <FiMoreHorizontal />
            </span>
          </div>

          {/* Second col Video / Image wrapper  */}
          <div
            className=" w-full relative"
            ref={likeAnimationContainer}
            onDoubleClick={handleDbPostContainer}
          >
            <>
              <span
                className="absolute z-10 hidden animate-ping"
                ref={likeAnimationElement}
              >
                <FaHeart className="text-red/90 text-[90px]" />
              </span>

              {data.type === "post" ? (
                <div className="bg-[gray]/40 h-fit max-h-full w-full overflow-hidden">
                  <LazyImage
                    src={data.src}
                    alt={"Post image"}
                    className="object-cover min-h-[400px] max-h-[500px] min-w-full max-w-[110%]"
                  />
                </div>
              ) : (
                <div className="bg-[gray]/40  w-full overflow-hidden">
                  <VideoPlayer
                    src={data.src}
                    alt="Video not Found"
                    className="object-cover min-h-[350px] max-h-[550px] min-w-full max-w-[120%]"
                    videoClassName={"h-fit"}
                  />
                </div>
              )}
            </>
          </div>

          {/* Third/Actions Col  */}
          <div className="mt-4 px-3">
            <div className=" flex flex-col w-full gap-1">
              <div className=" w-100 flex justify-between">
                <div className=" flex gap-4">
                  <TogglePostLike allLikes={data.likes} postId={data._id} />
                  <span
                    className=" hover:scale-110 transition cursor-pointer"
                    onClick={() => handleShowSinglePost(data._id)}
                  >
                    <FaRegComment className="text-[22px]" />
                  </span>
                  <span className=" hover:scale-110 transition cursor-pointer">
                    <BsSend className="text-[22px]" />
                  </span>
                </div>

                <span className=" hover:scale-110 transition cursor-pointer">
                  <FaRegBookmark className="text-[20px]" />
                </span>
              </div>

              <div>
                <h3 className="text-sm">{data.likes.length} Likes</h3>
                <PostTextRender
                  text={data.caption}
                  className={"text-sm"}
                  limit={60}
                />
              </div>

              <div className="min-h-fit flex flex-col">
                <span
                  className=" text-white/70 hover:text-white/100 w-fit text-sm transition cursor-pointer"
                  onClick={() => handleShowSinglePost(data._id)}
                >
                  {data.comments.length === 0
                    ? "Write First Comment"
                    : `View all ${data.comments.length} Comments`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
