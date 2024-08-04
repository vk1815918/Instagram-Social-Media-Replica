import { Router } from "express";
import commentController from "../controller/comment.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/:postId/comment", auth, commentController.getPostComments);
router.post("/:postId/comment", auth, commentController.postNewComment);
router.delete("/:commentId/comment", auth, commentController.deleteComment);
// router.put("/:postId/comment", auth, commentController.updateComment);

const commentRoutes = router;
export default commentRoutes;
