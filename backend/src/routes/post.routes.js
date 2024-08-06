import { Router } from "express";
import postController from "../controller/post.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", postController.getAllPosts);
router.get("/single/:id", postController.getSinglePost);
router.post("/", postController.createPost);
router.put("/", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.get("/my", postController.getMyPosts);
router.get("/user/:username", postController.getUserPosts);
router.post("/", postController.createPost);
router.post("/:postId/toggleLike", postController.toggleLike);
router.get("/reels", postController.getAllReels);

const postRoutes = router;
export default postRoutes;
