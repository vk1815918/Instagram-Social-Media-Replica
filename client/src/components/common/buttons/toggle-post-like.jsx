import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useToggleLikeMutation } from "../../../api/services/postServices";
import useAuth from "@/hooks/use-auth";

const TogglePostLike = ({ allLikes, postId }) => {
  const { user } = useAuth();
  const isLiked = allLikes?.some((likeId) => likeId === user?._id);
  const [toggleLike, { isLoading }] = useToggleLikeMutation();

  const handleTogglePostLike = () => {
    toggleLike(postId);
  };

  return (
    <button
      disabled={isLoading}
      className="cursor-pointer"
      onClick={handleTogglePostLike}
    >
      {isLiked ? (
        <FaHeart className="text-[22px] text-red/90" />
      ) : (
        <FaRegHeart className="text-[22px]" />
      )}
    </button>
  );
};

export default TogglePostLike;
