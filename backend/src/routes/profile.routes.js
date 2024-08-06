import { Router } from "express";
import profileController from "../controller/profile.controller.js";
const router = Router();

// Private Routes 👇🏼
router.get("/me", profileController.currentProfile);
router.put("/me/avatar", profileController.updateProfilePicture);
router.delete("/me/avatar", profileController.removeProfilePic);
router.put("/me/info", profileController.updateProfileInfo);

// Public Route 👇🏼
router.get("/:username", profileController.userProfile);

const profileRoutes = router;
export default profileRoutes;
