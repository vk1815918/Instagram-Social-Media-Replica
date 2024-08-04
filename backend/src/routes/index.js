import { Router } from "express";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import postRoutes from "./post.routes.js";
import accountRoutes from "./account.routes.js";
import commentRoutes from "./comment.routes.js";
import searchRoutes from "./search.routes.js";
import othersRoutes from "./others.routes.js";
import notificationRoutes from "./notification.routes.js";

// initial rootrouter wrapper 👇🏼
const router = Router();

// APi Test route 👇🏼
router.get("/test", (req, res) => {
  res.send("Api Is Working.");
});

// Add Some Routes 👇🏼
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/post", postRoutes);
router.use("/account", accountRoutes);
router.use("/post", commentRoutes);
router.use("/search", searchRoutes);
router.use("/notifications", notificationRoutes);
router.use("/", othersRoutes);

// Exporting Main / Root router 👇🏼
const rootRouter = router;
export default rootRouter;
