import { useGetSuggestedAccountsQuery } from "@/api/services/othersServices";
import FollowUnfollowActions from "@/components/common/buttons/follow-unfollow-actions";
import ProfileCard from "@/components/common/profile-card";
import SkeletonLoader from "@/components/ui/skeleton";
import React from "react";
import { twMerge } from "tailwind-merge";

const Suggestion = ({ containerClassName, limit }) => {
  const { data, isLoading, isError, error } =
    useGetSuggestedAccountsQuery(limit);

  if (isLoading) {
    return <SuggestionLoader limit={limit} />;
  }

  if (isError) {
    return <div className="w-full py-10 flex justify-center"></div>;
  }

  if (!data) {
    return;
  }

  return (
    <div className={twMerge(`${containerClassName}`)}>
      <header>
        <h3 className="text-md font-bold opacity-75">Suggested for you</h3>
      </header>

      <main>
        <ul className="w-full flex flex-col gap-2">
          {data?.map((s) => (
            <li
              key={s._id}
              className="w-full flex items-center justify-between gap-4"
            >
              <ProfileCard
                avatarUrl={s?.profilePicture}
                username={s?.username}
                withUsername
                verified={s.verified}
                withVerified
                avatarClassName={"size-8"}
                usernameClassName={"text-sm"}
                fullNameClassName={"text-xs leading-none opacity-70"}
                fullName={"Suggested for you"}
              />

              <FollowUnfollowActions
                accountId={s._id}
                size="sm"
                buttonsClassName={"bg-[transparent]"}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Suggestion;

const SuggestionLoader = ({ limit }) => (
  <div className="w-full flex flex-col gap-4 ">
    {[...Array(limit || 5)].map((_, idx) => (
      <div className="w-full flex gap-2" key={idx}>
        <SkeletonLoader width={"50px"} height={"50px"} variant="circle" />
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
    ))}
  </div>
);
