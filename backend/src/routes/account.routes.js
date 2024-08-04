import { Router } from "express";
import accountController from "../controller/account.controller.js";
import auth from "../middleware/auth.js";
const router = Router();

router.get(
  "/followers-following",
  auth,
  accountController.getFollowersFollowing
);
router.get("/:username", accountController.getUserAccount);
router.post("/:id/follow", auth, accountController.follow);
router.post("/:id/unfollow", auth, accountController.unfollow);
router.get("/:username/following", auth, accountController.getFollowing);
router.get("/:username/followers", auth, accountController.getFollowers);
router.get(
  "/:accountId/checkFollowingStatus",
  auth,
  accountController.checkFollowingStatus
);

const accountRoutes = router;
export default accountRoutes;
