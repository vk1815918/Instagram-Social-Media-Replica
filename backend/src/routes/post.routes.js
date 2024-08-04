import { Router } from "express";
import postController from "../controller/post.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", postController.getAllPosts);
router.get("/single/:id", postController.getSinglePost);
router.post("/", auth, postController.createPost);
router.put("/", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);
router.get("/my", auth, postController.getMyPosts);
router.get("/user/:username", postController.getUserPosts);
router.post("/", auth, postController.createPost);
router.post("/:postId/toggleLike", auth, postController.toggleLike);
router.get("/reels", postController.getAllReels);

const postRoutes = router;
export default postRoutes;
