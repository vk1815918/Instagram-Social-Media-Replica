import { useGetSuggestedAccountsQuery } from "@/api/services/othersServices";
import FollowUnfollowActions from "@/components/common/buttons/follow-unfollow-actions";
import ProfileCard from "@/components/common/profile-card";
import React from "react";
import { twMerge } from "tailwind-merge";

const Suggestion = ({ containerClassName, limit }) => {
  const { data, isLoading, isError, error } =
    useGetSuggestedAccountsQuery(limit);

  if (isLoading) {
    return (
      <div className="max-md:h-[100px] w-full flex justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return <div className="w-full py-10 flex justify-center"></div>;
  }

  console.log(isError);
  console.log(error);

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
