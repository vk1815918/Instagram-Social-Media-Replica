import { useGetUserPostsQuery } from "@/api/services/postServices";
import React from "react";
import { TfiVideoClapper } from "react-icons/tfi";
import { TbBoxMultiple, TbCamera } from "react-icons/tb";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showModal } from "@/store/slices/modalSlice";

const UserPostsContainer = () => {
  const { username: reqUsername } = useParams();
  const { data: posts, isLoading, isError } = useGetUserPostsQuery(reqUsername);

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

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10 text-md">
        Posts are loading...
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
      <div className="w-full h-[70vh]  flex justify-center items-center">
        <div className="flex flex-col gap-2 items-center">
          <span className="rounded-full w-[100px] aspect-square grid place-content-center border-solid border-white">
            <TbCamera className="text-[50px]" />
          </span>
          <h3>No Post yet</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="cursor-pointer grid grid-cols-3 gap-[1px] sm:gap-1">
      {posts.map((post) => (
        <div
          key={post._id}
          className="relative w-full bg-[gray] aspect-square cursor-pointer group overflow-hidden"
          onClick={() => handleShowSinglePost(post._id)}
        >
          <>
            <div className="absolute top-[20px] right-[20px] z-40">
              {post.type === "post" ? <TbBoxMultiple /> : <TfiVideoClapper />}
            </div>

            {post.type === "post" ? (
              <img
                src={post.src}
                className="absolute inset-0 min-w-full min-h-full max-w-[110%] max-h-[110%] object-cover group-hover:scale-125 transition-all"
                alt="Post Image"
              />
            ) : (
              <video
                src={post.src}
                className="object-cover w-full h-fit transition-all"
                alt="Reel"
              />
            )}
          </>
        </div>
      ))}
    </div>
  );
};

export default UserPostsContainer;
