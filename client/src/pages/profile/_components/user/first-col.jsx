import Avatar from "@/components/common/avatar";
import FollowUnfollowActions from "@/components/common/buttons/follow-unfollow-actions";
import ProfileCard from "@/components/common/profile-card";
import { handleShowModal } from "@/handler/modal-handlers";
import React from "react";
import { useSearchParams } from "react-router-dom";

const FirstCol = ({ userData }) => {
  const [_, setSearchParams] = useSearchParams();

  const handleOpenFollowingModal = () => {
    setSearchParams({ followings_req_username: userData?.username });
    handleShowModal("following");
  };
  const handleOpenFollowerModal = () => {
    setSearchParams({ followers_req_username: userData?.username });
    handleShowModal("followers");
  };

  return (
    <li className="grid grid-cols-[30%,70%] h-fit px-3 pb-5 max-sm:gap-2">
      {/* Avatar Container */}
      <div className="flex max-sm:mt-4 sm:items-center pl-3 sm:pl-10 min-h-full">
        <div className="w-[100px] sm:w-[130px]">
          <Avatar src={userData.profilePicture} />
        </div>
      </div>

      {/* SOme Profile COntainer */}
      <div className="h-full">
        <ul className="flex flex-col gap-4 ">
          <li className="flex items-center flex-wrap gap-5">
            <ProfileCard
              username={userData?.username}
              withUsername
              verified={userData?.verified}
              withVerified
            />

            <div className="flex gap-2 flex-wrap">
              {<FollowUnfollowActions accountId={userData._id} />}
              <button className="btn-secondary px-6 text-sm text-light">
                Message
              </button>
            </div>
          </li>

          {/* Account Status for large screen*/}
          <li className="flex justify-between w-full sm:w-3/6 max-sm:hidden">
            <span className="text-md">
              {userData?.posts.length < 1
                ? "0 posts"
                : `${userData?.posts.length} posts`}
            </span>
            <span
              className="text-md cursor-pointer"
              onClick={handleOpenFollowerModal}
            >
              {userData?.followers.length < 1
                ? "0 follower"
                : `${userData?.followers.length} followers`}
            </span>
            <span
              className="text-md cursor-pointer"
              onClick={handleOpenFollowingModal}
            >
              {userData?.following.length < 1
                ? "0 following"
                : `${userData?.following.length} followings`}
            </span>
          </li>

          {/* Account bio */}
          <li className="flex flex-col ">
            <span className="text-sm leading-tight">{userData?.fullName}</span>
            <span className="text-sm leading-tight line-clamp-4">
              {userData?.bio ? userData?.bio : "There is no bio"}
            </span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default FirstCol;
