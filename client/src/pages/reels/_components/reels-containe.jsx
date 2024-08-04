import React, { useRef } from "react";
import { useGetAllReelsQuery } from "@/api/services/postServices";
import { SpinnerLoader } from "@/components/common/loader";
import ReelCard from "../_components/_reel-card";

const ReelsContainer = () => {
  const element = useRef(null);
  const { data, isLoading } = useGetAllReelsQuery();

  const handleDrag = (e) => {
    element.current.scrollTop += 500;
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <SpinnerLoader className={"size-[40px] "} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3>There is no available reels for yet</h3>
      </div>
    );
  }

  return (
    <div
      onDragStart={handleDrag}
      ref={element}
      id="reels-container"
      className="w-full sm:w-[500px] h-full sm:h-[90vh] scrollbar-hidden overflow-y-scroll flex flex-col"
    >
      {" "}
      {data?.map((reel) => (
        <ReelCard key={reel._id} reelData={reel} />
      ))}
    </div>
  );
};

export default ReelsContainer;
