import { useDeletePostMutation } from "@/api/services/postServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const DeletePostButton = ({ postId, className }) => {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const navigate = useNavigate();
  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id).unwrap();
      toast.dark(res.message);
      navigate(-1);
    } catch (error) {
      toast.dark(res.data.message);
    }
  };

  return (
    <button
      className={twMerge(`cursor-pointer py-1 px-4 ${className}`)}
      onClick={() => handleDeletePost(postId)}
      disabled={isDeleting}
    >
      Delete
    </button>
  );
};

export default DeletePostButton;
