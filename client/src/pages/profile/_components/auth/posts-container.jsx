import { useGetMyPostsQuery } from "@/api/services/postServices";
import LazyImage from "@/components/ui/lazy-image";
import { handleShowModal } from "@/handler/modal-handlers";
import React from "react";
import { TbBoxMultiple, TbCamera } from "react-icons/tb";
import { TfiVideoClapper } from "react-icons/tfi";
import DeletePostButton from "../../../../components/common/buttons/delete-post-btn";
import { useNavigate } from "react-router-dom";

const AuthPostsContainer = () => {
  const { data: posts, isLoading, isError } = useGetMyPostsQuery();
  const navigate = useNavigate();

  const handleNavigateToSinglePost = (postId) => {
    navigate(`/p/${postId}`);
  };
  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10 text-md">
        Posts is loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-md text-center w-full py-10">
        Somthing went wrong please try again
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full h-[60vh] sm:h-[70vh] flex flex-col gap-6 justify-center items-center ">
        <div className="flex flex-col gap-2 items-center">
          <span className="rounded-full w-[100px] aspect-square grid place-content-center border-solid border-white">
            <TbCamera className="text-[50px]" />
          </span>
          <h3>No Post yet</h3>
        </div>

        <button
          className="bg-blue rounded-full px-2 py-1"
          onClick={() => handleShowModal("createPost")}
        >
          Create new post
        </button>
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-3 gap-[1px] sm:gap-1">
      {posts.map((post) => (
        <div
          key={post._id}
          className="relative w-full bg-[gray] aspect-square cursor-pointer group overflow-hidden"
          onClick={() => handleNavigateToSinglePost(post._id)}
        >
          <>
            <div className="absolute top-[20px] right-[20px] z-40">
              {post.type === "post" ? <TbBoxMultiple /> : <TfiVideoClapper />}
            </div>

            {post.type === "post" ? (
              <LazyImage
                src={post.src}
                className="absolute inset-0 min-w-full min-h-full max-w-[110%] max-h-[110%] object-cover group-hover:scale-125 transition-all"
                alt=""
              />
            ) : (
              <video
                src={post.src}
                className="object-cover w-full h-full transition-all"
                alt=""
              />
            )}
          </>
        </div>
      ))}
    </div>
  );
};

export default AuthPostsContainer;
