import { useGetFollowersQuery } from "@/api/services/accountServices";
import { SpinnerLoader } from "../../loader";
import ProfileCard from "../../profile-card";
import FollowUnfollowActions from "../../buttons/follow-unfollow-actions";

const UsersContainer = ({ username, searchQuery }) => {
  const { data, isError, isLoading } = useGetFollowersQuery({
    username,
    searchQuery,
  });

  if (isLoading) {
    return (
      <div className="py-10 w-full grid place-content-center">
        <SpinnerLoader className={"size-8"} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 w-full grid place-content-center">
        <p>Some Error occured please try again</p>
      </div>
    );
  }
  //followers_req_username
  if (data?.followers && data?.followers.length === 0) {
    return (
      <div className="py-10 w-full grid place-content-center">
        <p>There is no followers account</p>
      </div>
    );
  }

  return (
    <main className="overflow-y-scroll w-full flex-1 pr-2 py-2">
      {/* Account Wrapper */}
      <ul className="flex flex-col gap-3">
        {/* Single Account */}
        {data?.followers.map((f) => (
          <li className="flex justify-between" key={f._id}>
            <ProfileCard
              avatarUrl={f.profilePicture}
              username={f.username}
              fullName={f.fullName}
              usernameClassName={"text-xs "}
              fullNameClassName={"text-xs leading-none opacity-50"}
              withUsername
            />
            <div>
              <FollowUnfollowActions
                accountId={f._id}
                followMessage={"Follow"}
                unFollowMessage={"Unfollow"}
              />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default UsersContainer;
