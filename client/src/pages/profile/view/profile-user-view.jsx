import { TfiBookmark, TfiTag } from "react-icons/tfi";
import { SpinnerLoader } from "@/components/common/loader.jsx";
import { useGetAccountProfileQuery } from "@/api/services/accountServices.js";
import { BsPostageFill } from "react-icons/bs";
import UserPostsContainer from "../_components/user/posts-container.jsx";
import FirstCol from "../_components/user/first-col.jsx";
import { useSearchParams } from "react-router-dom";
import { handleShowModal } from "@/handler/modal-handlers.js";
import NotFoundPage from "@/pages/not-found-page.jsx";

const ProfileUserview = ({ username: reqUsername }) => {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetAccountProfileQuery(reqUsername);
  const [_, setSearchParams] = useSearchParams();

  const handleOpenFollowingModal = (username) => {
    setSearchParams({ followings_req_username: username });
    handleShowModal("following");
  };

  const handleOpenFollowerModal = (username) => {
    setSearchParams({ followers_req_username: username });
    handleShowModal("followers");
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <SpinnerLoader className={"size-[30px]"} />
      </div>
    );
  }

  if (error && error?.status === 404) {
    return <NotFoundPage />;
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center py-10">Some Error Occured</div>
    );
  }

  return (
    <div className="w-full h-20">
      <div className="max-lg:w-full w-[90%] sm:ml-5 flex flex-col">
        <ul>
          {/* First Col */}
          <FirstCol userData={userData} />

          {/* Account Status for Small screen*/}
          <li className="sm:hidden w-full px-3 py-2">
            <div className="flex justify-between w-full sm:w-3/6">
              <div className="text-md text-center flex flex-col">
                <span>{userData?.posts.length}</span>
                <span className="opacity-70">
                  {userData?.posts.length < 1 ? "post" : "posts"}
                </span>
              </div>
              <div
                className="text-md text-center flex flex-col cursor-pointer"
                onClick={() => handleOpenFollowerModal(userData?.username)}
              >
                <span>{userData?.followers.length}</span>
                <span className="opacity-70">
                  {userData?.followers.length < 1 ? "follower" : "followers"}
                </span>
              </div>
              <div
                className="text-md text-center flex flex-col cursor-pointer"
                onClick={() => handleOpenFollowingModal(userData?.username)}
              >
                <span>{userData?.following.length}</span>
                <span className="opacity-70">
                  {userData?.following.length < 1 ? "following" : "followings"}
                </span>
              </div>
            </div>
          </li>

          {/* Third Second col */}
          <li className="w-full py-5">
            <div className="flex flex-col gap-4">
              {/* Tabs container */}
              <div className="px-3 w-full h-10 flex justify-center items-center">
                <ul className="flex gap-10 max-sm:justify-between max-sm:gap-0 max-sm:w-full">
                  <li className="cursor-pointer relative">
                    <span className="absolute w-full h-[1px] top-[-10px] bg-white mb-10"></span>
                    <div className="space-x-2 flex items-center">
                      <span>
                        <BsPostageFill />
                      </span>
                      <span className="text-sm uppercase">Posts</span>
                    </div>
                  </li>

                  <li className="cursor-pointer relative opacity-70">
                    <div className="space-x-2 flex items-center">
                      <span>
                        <TfiBookmark />
                      </span>
                      <span className="text-sm uppercase">Saved</span>
                    </div>
                  </li>

                  <li className="cursor-pointer relative opacity-70">
                    <div className="space-x-2 flex items-center">
                      <span>
                        <TfiTag />
                      </span>
                      <span className="text-sm uppercase">Tagged</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* User Posts Container */}
              <UserPostsContainer />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileUserview;
