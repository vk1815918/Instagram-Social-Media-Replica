import { useEffect, useRef } from "react";
import PostCard from "./_post-card";
import { useGetAllPostsQuery } from "@/api/services/postServices.js";
import { SpinnerLoader } from "@/components/common/loader";
import { useSearchParams } from "react-router-dom";
import Suggestion from "./suggestion";

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
    return (
      <div className="mt-10 w-full flex justify-center">
        <SpinnerLoader />
      </div>
    );
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
