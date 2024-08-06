import { Router } from "express";
import commentController from "../controller/comment.controller.js";

const router = Router();

router.get("/:postId/comment", commentController.getPostComments);
router.post("/:postId/comment", commentController.postNewComment);
router.delete("/:commentId/comment", commentController.deleteComment);
router.put(
  "/:commentId/comment/toggleLike",
  commentController.toggleCommentLike
);

const commentRoutes = router;
export default commentRoutes;