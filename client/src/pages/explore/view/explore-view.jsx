import React from "react";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { TbBoxMultiple } from "react-icons/tb";
import { useExploreQuery } from "../../../api/services/othersServices";
import LazyImage from "@/components/ui/lazy-image";
import { useNavigate } from "react-router-dom";

const ExploreView = () => {
  const { data, isLoading, error } = useExploreQuery();
  const navigate = useNavigate();
  const specialPatternIndices = [2, 5, 12, 15, 19];

  const isSpecialIndex = (index) => {
    return specialPatternIndices.includes(index % 20);
  };

  const handleNavigateToSinglePost = (postId) => {
    navigate(`/p/${postId}`);
  };
  return (
    <div className="w-full h-screen sm:pr-10">
      {isLoading ? (
        <div className="flex justify-center pt-10">Loading...</div>
      ) : (
        <ul className="grid grid-cols-3 w-full gap-1">
          {data &&
            data.map((itm, idx) => (
              <li
                className={`relative overflow-hidden group cursor-pointer ${
                  isSpecialIndex(idx) ? "row-span-2" : "aspect-square"
                }`}
                id="explore-card"
                key={itm._id}
                onClick={() => handleNavigateToSinglePost(itm._id)}
              >
                <div className="size-full group-hover:scale-[110%] transition-all ">
                  <LazyImage
                    src={itm?.src}
                    alt=""
                    className="size-full object-cover"
                    containerClassName="size-full object-cover"
                  />
                </div>

                <div className="absolute top-2 right-2">
                  <span>
                    <TbBoxMultiple />
                  </span>
                </div>

                <div className="absolute inset-0 bg-black/30 hidden group-hover:grid transition-all place-content-center size-full">
                  <ul className="flex gap-2 items-center">
                    <li className="flex gap-1 items-center">
                      <span>
                        <FaRegComment className="text-xl" />
                      </span>
                      <span className="font-semibold">
                        {itm?.comments.length}
                      </span>
                    </li>

                    <li className="flex gap-1 items-center">
                      <span className="text-xl">
                        <FaHeart />
                      </span>
                      <span className="font-semibold">{itm?.likes.length}</span>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ExploreView;
