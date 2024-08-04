import React, { useState } from "react";
import { textSlicer } from "./text";
import { twMerge } from "tailwind-merge";

const PostTextRender = ({
  text,
  limit = 50,
  className,
  actionClassName,
  withHide = true,
}) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(true);
  };
  const handleHideMore = () => {
    setShowMore(false);
  };

  return (
    <h2 className="space-x-3">
      <span className={twMerge(`${className}`)}>
        {textSlicer(text, showMore ? null : limit)}
      </span>
      {!showMore && text.length > limit && (
        <span
          className={twMerge(
            `cursor-pointer text-sm opacity-70 hover:opacity-100 transition ${actionClassName}`
          )}
          onClick={handleShowMore}
        >
          more
        </span>
      )}
      {withHide && showMore && (
        <span
          className={twMerge(
            `cursor-pointer text-sm opacity-70 hover:opacity-100 transition ${actionClassName}`
          )}
          onClick={handleHideMore}
        >
          hide
        </span>
      )}
    </h2>
  );
};

export default PostTextRender;
