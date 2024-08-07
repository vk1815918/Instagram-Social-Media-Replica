import { useEffect, useRef } from "react";
import PostCard from "./_post-card";
import { useGetAllPostsQuery } from "@/api/services/postServices.js";
import { SpinnerLoader } from "@/components/common/loader";
import { useSearchParams } from "react-router-dom";
import Suggestion from "./suggestion";
import SkeletonLoader from "@/components/ui/skeleton";

const PostListContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;
  const { data, isLoading, isError, isFetching } = useGetAllPostsQuery(page);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 30 &&
        !isLoading &&
        !isFetching
      ) {
        if (data?.totalPages === page) return;
        setSearchParams({ page: page + 1 });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, isFetching]);

  //   Rendering View Using Conditional👇🏼
  if (isLoading) {
    return <PostLoader />;
  }

  if (isError) {
    return (
      <div className="w-full py-10 flex justify-center">Some Error Occured</div>
    );
  }

  if (data.posts.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <h3 className="mt-10">There is no posts for yet</h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="gap-[20px] flex flex-col items-center">
        {data.posts.map((post, idx) => {
          if (idx === 3) {
            return (
              <>
                <PostCard key={post._id + idx} data={post} />
                <Suggestion
                  key={idx}
                  containerClassName={"w-full sm:hidden px-3"}
                  limit={3}
                />
              </>
            );
          }
          return <PostCard key={post._id + idx} data={post} />;
        })}
      </div>

      {data.posts && isFetching && (
        <div className="w-full flex justify-center">
          <SpinnerLoader />
        </div>
      )}
    </div>
  );
};

export default PostListContainer;

const PostLoader = () => (
  <div className=" w-full flex flex-col gap-10 sm:gap-20 items-center">
    {/* Single Card Loader */}
    {[
      [...Array(3)].map(() => (
        <div className="max-sm:w-full sm:w-[65%] min-h-fit justify-center">
          <div className="w-full flex flex-col items-center gap-4">
            {/* Header */}
            <div className="px-2 w-full flex gap-2">
              <SkeletonLoader width={"35px"} variant="circle" />
              <div className="w-full flex flex-col  gap-1">
                <SkeletonLoader
                  width={"70%"}
                  height={"13px"}
                  borderRadius={"50px"}
                  speed="2s"
                />
                <SkeletonLoader
                  width={"50%"}
                  height={"13px"}
                  borderRadius={"50px"}
                  speed="3s"
                />
              </div>
            </div>

            {/* Post Section */}
            <SkeletonLoader
              width={"100%"}
              height={"55vh"}
              className="rounded-none sm:rounded-md"
            />
          </div>
        </div>
      )),
    ]}
  </div>
);
