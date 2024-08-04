import { Router } from "express";
import profileController from "../controller/profile.controller.js";
import auth from "../middleware/auth.js";
const router = Router();

// Private Routes 👇🏼
router.get("/me", auth, profileController.currentProfile);
router.put("/me/avatar", auth, profileController.updateProfilePicture);
router.delete("/me/avatar", auth, profileController.removeProfilePic);
router.put("/me/info", auth, profileController.updateProfileInfo);

// Public Route 👇🏼
router.get("/:username", auth, profileController.userProfile);

const profileRoutes = router;
export default profileRoutes;
