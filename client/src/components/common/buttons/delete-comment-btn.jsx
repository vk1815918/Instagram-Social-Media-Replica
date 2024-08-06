import { useDeleteCommentMutation } from "@/api/services/commentServices";
import { canDeleteComment } from "@/utils/utils";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const DeleteCommentButton = ({ title, commentId, userId, className }) => {
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const handleDeleteComment = async () => {
    console.log(commentId);
    try {
      await deleteComment(commentId).unwrap();
    } catch (error) {
      toast.dark(res.data.message);
    }
  };

  if (!canDeleteComment(userId)) {
    return;
  }

  return (
    <span
      className={twMerge(`cursor-pointer ${className}`)}
      onClick={handleDeleteComment}
    >
      {title}
    </span>
  );
};

export default DeleteCommentButton;
