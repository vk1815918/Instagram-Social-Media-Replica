import { TfiBookmark, TfiTag } from "react-icons/tfi";
import useAuth from "@/hooks/use-auth.jsx";
import AuthPostsContainer from "../_components/auth/posts-container";
import FirstCol from "../_components/auth/first-col";
import { BsPostcard } from "react-icons/bs";
import { handleShowModal } from "@/handler/modal-handlers";
import { useSearchParams } from "react-router-dom";

const ProfileAuthorview = () => {
  const { user } = useAuth();
  const [_, setSearchParams] = useSearchParams();

  const handleOpenFollowingModal = () => {
    setSearchParams({ followings_req_username: user.username });
    handleShowModal("following");
  };
  const handleOpenFollowerModal = () => {
    setSearchParams({ followers_req_username: user.username });
    handleShowModal("followers");
  };

  return (
    <>
      <div className="w-full">
        <div className="max-lg:w-full w-[90%] sm:ml-5 flex flex-col">
          <ul>
            {/* First Col */}
            {/* Hold some details like user profile , post status, follwing and unfollwing */}
            <FirstCol user={user} />

            {/* Account Status for Small screen*/}
            <li className="sm:hidden w-full px-3 py-2">
              <div className="flex justify-between w-full sm:w-3/6">
                <div className="text-md text-center flex flex-col">
                  <span>{user?.posts.length}</span>
                  <span className="opacity-70">
                    {user?.posts.length < 1 ? "post" : "posts"}
                  </span>
                </div>
                <div
                  className="text-md text-center flex flex-col"
                  onClick={() => handleOpenFollowerModal()}
                >
                  <span>{user?.followers.length}</span>
                  <span className="opacity-70">
                    {user?.followers.length < 1 ? "follower" : "followers"}
                  </span>
                </div>
                <div
                  className="text-md text-center flex flex-col"
                  onClick={() => handleOpenFollowingModal()}
                >
                  <span>{user?.following.length}</span>
                  <span className="opacity-70">
                    {user?.following.length < 1 ? "following" : "followings"}
                  </span>
                </div>
              </div>
            </li>

            {/* Second col */}
            <li className="w-full py-5">
              <div className="flex flex-col gap-4 w-full ">
                {/* Tabs container */}
                <div className="px-3 w-full h-10 flex justify-center items-center">
                  <ul className="flex gap-10 max-sm:justify-between max-sm:gap-0 max-sm:w-full">
                    <li className="cursor-pointer relative">
                      <span className="absolute w-full h-[1px] top-[-10px] bg-white mb-10"></span>
                      <div className="space-x-2 flex items-center">
                        <span>
                          <BsPostcard />
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

                {/* Posts Container */}
                <AuthPostsContainer />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileAuthorview;
