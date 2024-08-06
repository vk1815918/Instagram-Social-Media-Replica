import React, { useEffect } from "react";
import ProfileCard from "../../profile-card";
import { format } from "timeago.js";
import { useLazyGetPostCommentQuery } from "@/api/services/commentServices";
import { SpinnerLoader } from "../../loader";
import Comment from "./_comment";

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

  if (comments?.length === 0) {
    return (
      <div className="flex-1 w-full flex justify-center items-center">
        <h2>No comment yet!</h2>
      </div>
    );
  }

  return (
    <li className="w-full overflow-y-scroll flex-1 py-4 px-1">
      <ul className="w-full flex-col space-y-5">
        {
          <>
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
