import { useGetSinglePostQuery } from "@/api/services/postServices";
import { SpinnerLoader } from "@/components/common/loader";
import NotFoundPage from "@/pages/not-found-page";
import React from "react";
import { useParams } from "react-router-dom";
import MediaContainer from "../_components/media-container";
import Header from "../_components/header";
import CommentSection from "../_components/comment-section";
import Footer from "../_components/footer";

const SinglePostView = () => {
  const { postId } = useParams();
  const { data, isLoading, isFetching, isError, error } =
    useGetSinglePostQuery(postId);

  if (isLoading) {
    return (
      <div className="mt-20 flex justify-center items-center">
        <SpinnerLoader />
      </div>
    );
  }

  if (error?.status && error?.status === 404) {
    return <NotFoundPage />;
  }

  if (error) {
    return (
      <div className="mt-20 grid place-content-center">
        Some went wrong please try again
      </div>
    );
  }

  return (
    <main className="w-full md:flex md:justify-center">
      <div className="flex ">
        {/* Post section */}
        <div className="w-full md:min-w-[300px] md:max-w-[600px] min-h-[60vh]">
          <div className="w-full md:hidden p-3">
            <Header post={data} />
          </div>

          <MediaContainer post={data} />

          <div className="w-full p-3 md:hidden">
            <Footer post={data} postID={postId} />
          </div>
        </div>

        {/* Comment section for big screen only */}
        <div className="w-[600px] h-[90vh] max-md:hidden">
          <div className=" h-full p-3 overflow-hidden">
            <ul className=" flex flex-col h-full">
              {/* ------ Header------ */}
              <Header post={data} />

              {/* Comment Section */}
              <CommentSection post={data} postID={postId} />

              {/* Bottom / Actions Section */}
              <Footer post={data} postID={postId} />
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SinglePostView;
