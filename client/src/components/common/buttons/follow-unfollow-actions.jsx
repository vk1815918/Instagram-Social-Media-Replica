import {
  useCheckFollowingStatusQuery,
  useFollowAccountMutation,
  useUnFollowAccountMutation,
} from "@/api/services/accountServices";
import useAuth from "@/hooks/use-auth";
import { twMerge } from "tailwind-merge";

const FollowUnfollowActions = ({
  accountId,
  unFollowMessage,
  followMessage,
  buttonsClassName,
  size = "md",
  withFollowBtn = true,
  withUnfollowBtn = true,
}) => {
  const { isLoading: isUserLoading, user, isFaild: isUserFaild } = useAuth();

  const { data: followingStatus, isLoading: isStatusLoading } =
    useCheckFollowingStatusQuery(accountId);
  const [follow] = useFollowAccountMutation();
  const [unFollow] = useUnFollowAccountMutation();

  const handleFollow = () => {
    follow(accountId);
  };

  const handleUnfollow = () => {
    unFollow(accountId);
  };

  if (isUserLoading || isStatusLoading || isUserFaild) {
    return;
  }
  if (user?._id === accountId) {
    return;
  }

  if (withFollowBtn && !followingStatus.isFollowing) {
    return (
      <button
        onClick={handleFollow}
        className={twMerge(
          `btn-primary text-light ${size === "sm" && "text-xs px-[8px]"}
        ${size === "md" && "text-sm px-5"}
        ${buttonsClassName}`
        )}
      >
        {followMessage ? followMessage : "Follow"}
      </button>
    );
  }

  if (withUnfollowBtn)
    return (
      <button
        onClick={handleUnfollow}
        className={twMerge(
          `rounded bg-[gray] cursor-pointer text-white ${
            size === "sm" && "text-xs px-[8px]"
          }
        ${size === "md" && "text-sm px-5"} ${buttonsClassName}`
        )}
      >
        {unFollowMessage ? unFollowMessage : "Following"}
      </button>
    );
};

export default FollowUnfollowActions;
