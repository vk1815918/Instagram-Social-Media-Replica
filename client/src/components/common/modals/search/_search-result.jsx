import React, { useEffect } from "react";
import ProfileCard from "../../profile-card";
import { useLazySearchQuery } from "@/api/services/othersServices";
import { SpinnerLoader } from "../../loader";

const SearchResult = ({ inputValue }) => {
  const [search, { data, isLoading, isError }] =
    useLazySearchQuery();

  useEffect(() => {
    if (!inputValue) return;
    search(inputValue);
  }, [inputValue]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <SpinnerLoader className="w-8" />;
      </div>
    );
  }

  if (isError) {
    return <h3 className="text-center pt-10">Some error occuerd</h3>;
  }

  if (data?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">No Result</div>
    );
  }
  if (inputValue.length === 0) {
    return (
      <div className="h-full w-full flex flex-col pt-5">
        <h3>Recent</h3>
        <div className="flex-1 flex items-center justify-center">
          No Recent Search
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 w-full flex-1 px-2 overflow-y-scroll">
      <div className="flex flex-col gap-2 w-full ">
        {data?.map((itm, index) => (
          <ProfileCard
            verified={itm.verified}
            withVerified
            username={itm.username}
            withUsername
            avatarUrl={itm.profilePicture}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
