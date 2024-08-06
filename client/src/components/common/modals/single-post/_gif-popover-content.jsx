import React, { useState } from "react";
import { useGetGIfsQuery } from "@/api/services/othersServices";
import { SpinnerLoader } from "../../loader";
import Masonry from "react-masonry-css";
import LazyImage from "@/components/ui/lazy-image";
import { FaSearch } from "react-icons/fa";
import { usePostCommentMutation } from "@/api/services/commentServices";
import { useSearchParams } from "react-router-dom";

const GifPopoverContent = ({ postId, setGifPopoverTrigger }) => {
  const [query, setQuery] = useState("");
  const [addComment] = usePostCommentMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const commentIdToReply = searchParams.get("commentIdToReply") || "";

  const {
    data: gifs,
    isLoading,
    isError,
  } = useGetGIfsQuery({
    query,
    limit: 30,
  });

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
  };

  // when user click gif send the comment
  const handleClickGif = async (gifUrl) => {
    await addComment({ postId, gifUrl, parentComment: commentIdToReply });
    setSearchParams((prev) => {
      prev.delete("commentIdToReply");
      return prev;
    });
    setGifPopoverTrigger(false);
  };

  if (isLoading) {
    return (
      <div className="size-full grid place-content-center">
        <SpinnerLoader />
      </div>
    );
  }

  if (isError || gifs?.message) {
    return <h1 className="text-center mt-10">Some went wrong </h1>;
  }

  return (
    <div className="py-4 flex flex-col gap-3">
      <div className="pb-2 px-3 w-full flex items-center gap-2">
        <span className="pr-1">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="flex-1 w-full p-1 px-2 rounded-lg bg-[black]/50 text-md"
          onChange={handleSearchInputChange}
        />
      </div>
      <Masonry
        className="my-masonry-grid "
        columnClassName="my-masonry-grid_column"
      >
        {gifs &&
          gifs?.map((gif, index) => (
            <div
              key={index}
              className="masonry-item cursor-pointer"
              onClick={() => handleClickGif(gif.images.fixed_height.url)}
            >
              <LazyImage
                src={gif.images.fixed_height.url}
                alt={`img-${index}`}
              />
            </div>
          ))}
      </Masonry>
    </div>
  );
};

//
export default GifPopoverContent;
