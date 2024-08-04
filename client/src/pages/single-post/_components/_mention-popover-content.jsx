import { useGetFollowersFollowingQuery } from "@/api/services/accountServices";
import ProfileCard from "@/components/common/profile-card";
import { useEffect } from "react";

const MentionPopverContent = ({
  setFollowersFollowing,
  users,
  onUserSelect,
}) => {
  const {
    data: followersFollowing,
    isLoading,
    isError,
  } = useGetFollowersFollowingQuery();

  useEffect(() => {
    setFollowersFollowing(followersFollowing);
  }, [followersFollowing]);

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  if (isError) {
    return <h2>Some error</h2>;
  }

  return (
    <ul className="w-full flex flex-col gap-2">
      {users.map((user) => (
        <li key={user._id} onClick={() => onUserSelect(user?.username)}>
          <ProfileCard
            username={user?.username}
            withNavigator={false}
            withUsername
            avatarUrl={user?.profilePicture}
          />
        </li>
      ))}
    </ul>
  );
};

export default MentionPopverContent;
