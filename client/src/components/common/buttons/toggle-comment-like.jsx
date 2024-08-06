import { FaRegHeart, FaHeart } from "react-icons/fa";
import useAuth from "@/hooks/use-auth";
import { useToggleCommentLikeMutation } from "@/api/services/commentServices";

const ToggleCommentLikeButton = ({ allLikes, commentId, }) => {
  const { user } = useAuth();
  const isLiked = allLikes?.some((likeId) => likeId === user?._id);
  const [toggleLike, { isLoading }] = useToggleCommentLikeMutation();

  const handleTogglePostLike = () => {
    toggleLike(commentId);
  };

  return (
    <button
      disabled={isLoading}
      className="cursor-pointer"
      onClick={handleTogglePostLike}
    >
      {isLiked ? (
        <FaHeart className="text-[14px] text-red/90" />
      ) : (
        <FaRegHeart className="text-[14px]" />
      )}
    </button>
  );
};

export default ToggleCommentLikeButton;
