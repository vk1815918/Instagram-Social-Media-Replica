import React, { useEffect } from "react";
import { format } from "timeago.js";
import { useLazyGetPostCommentQuery } from "@/api/services/commentServices";
import Comment from "./_comment";
import { SpinnerLoader } from "@/components/common/loader";
import ProfileCard from "@/components/common/profile-card";

const CommentSection = ({ post, postID }) => {
  const [getComments, { data: comments, isLoading, isFetching, isError }] =
    useLazyGetPostCommentQuery();

  useEffect(() => {
    getComments(postID);
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 pt-10 flex justify-center">
        <SpinnerLoader className={"size-7"} />
      </div>
    );
  }

  if (isError) {
    return <div className="flex-1 text-center pt-10">Some error occured</div>;
  }

  return (
    <li className="w-full overflow-y-scroll flex-1 py-4 px-1">
      <ul className="w-full flex-col space-y-5">
        {
          <>
            {/* ----Author Text Body----- */}

            <li className="w-full ">
              <ul className="flex items-start gap-2">
                <ProfileCard
                  username={post?.user?.username}
                  avatarUrl={post?.user?.profilePicture}
                  withUsername={false}
                  withVerified={false}
                  avatarClassName="w-8"
                />

                <li className="flex-1 flex flex-col">
                  <div>
                    <ProfileCard
                      username={post?.user?.username}
                      withUsername
                      withVerified
                      verified={post?.user?.verified}
                      usernameClassName={"text-[17px]"}
                    />
                    <h3 className="text-[15px] leading-tight">
                      {post?.caption}
                    </h3>
                  </div>

                  <div className="opacity-70 space-x-2 ">
                    <span className="text-xs">{format(post?.createdAt)}</span>
                  </div>
                </li>
              </ul>
            </li>
            {/* Single Comment */}

            {comments &&
              comments?.map((comment) => (
                <Comment key={comment?._id} comment={comment} />
              ))}
          </>
        }
      </ul>
    </li>
  );
};

export default CommentSection;
