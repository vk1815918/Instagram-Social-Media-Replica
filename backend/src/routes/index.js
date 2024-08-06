import { Router } from "express";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import postRoutes from "./post.routes.js";
import accountRoutes from "./account.routes.js";
import commentRoutes from "./comment.routes.js";
import searchRoutes from "./search.routes.js";
import othersRoutes from "./others.routes.js";
import notificationRoutes from "./notification.routes.js";
import auth from "../middleware/auth.js";

// initial rootrouter wrapper 👇🏼
const router = Router();

// APi Test route 👇🏼
router.get("/test", (req, res) => {
  res.send("Api Is Working.");
});

// Add Some Routes 👇🏼
router.use("/auth", authRoutes);
router.use("/profile",auth, profileRoutes);
router.use("/post", auth, postRoutes);
router.use("/account", auth, accountRoutes);
router.use("/post", auth, commentRoutes);
router.use("/search", auth, searchRoutes);
router.use("/notifications", auth, notificationRoutes);
router.use("/", auth, othersRoutes);

// Exporting Main / Root router 👇🏼
const rootRouter = router;
export default rootRouter;
