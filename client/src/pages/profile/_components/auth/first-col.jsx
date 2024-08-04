import Avatar from "@/components/common/avatar";
import ProfileCard from "@/components/common/profile-card";
import { handleShowModal } from "@/handler/modal-handlers";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FirstCol = ({ user }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleEditProfile = () => {
    navigate("/accounts/edit");
  };

  const handleOpenFollowingModal = () => {
    setSearchParams({ followings_req_username: user.username });
    handleShowModal("following");
  };
  const handleOpenFollowerModal = () => {
    setSearchParams({ followers_req_username: user.username });
    handleShowModal("followers");
  };

  return (
    <li className="grid grid-cols-[30%,70%] h-fit px-3 pb-5 max-sm:gap-2">
      {/* Avatar Container */}
      <div className="flex max-sm:mt-4 sm:items-center pl-3 sm:pl-10 min-h-full">
        <div className="w-[100px] sm:w-[130px]">
          <Avatar src={user?.profilePicture} />
        </div>
      </div>

      {/* SOme Profile COntainer */}
      <div className="h-full">
        <ul className="flex flex-col gap-4 ">
          <li className="flex items-center flex-wrap gap-5">
            <ProfileCard
              username={user?.username}
              withUsername
              verified={user?.verified}
              withVerified
            />

            <div className="flex gap-2 flex-wrap w-3/4 sm:w-1/2">
              <button
                className="btn-secondary px-2 text-sm text-light"
                onClick={handleEditProfile}
              >
                Edit profile
              </button>
              <button className="btn-secondary px-2 text-sm text-light ">
                View Archieve
              </button>
              <button className="btn-secondary px-2 text-sm text-light">
                Add tools
              </button>
            </div>
          </li>

          {/* Account Status for large screen*/}
          <li className="flex justify-between w-full sm:w-3/6 max-sm:hidden">
            <span className="text-md">
              {user?.posts.length < 1
                ? "0 posts"
                : `${user?.posts.length} posts`}
            </span>
            <span
              className="text-md cursor-pointer"
              onClick={() => handleOpenFollowerModal(user?.username)}
            >
              {user?.followers.length < 1
                ? "0 follower"
                : `${user?.followers.length} followers`}
            </span>
            <span
              className="text-md cursor-pointer"
              onClick={() => handleOpenFollowingModal(user?.username)}
            >
              {user?.following.length < 1
                ? "0 following"
                : `${user?.following.length} followings`}
            </span>
          </li>

          {/* Account bio */}
          <li className="flex flex-col ">
            <span className="text-sm leading-tight">{user?.fullName}</span>
            <span className="text-sm leading-tight">
              {user?.bio ? user?.bio : "There is no bio"}
            </span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default FirstCol;
