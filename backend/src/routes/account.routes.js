import { Router } from "express";
import accountController from "../controller/account.controller.js";
const router = Router();

router.get("/followers-following", accountController.getFollowersFollowing);
router.get("/:username", accountController.getUserAccount);
router.post("/:id/follow", accountController.follow);
router.post("/:id/unfollow", accountController.unfollow);
router.get("/:username/following", accountController.getFollowing);
router.get("/:username/followers", accountController.getFollowers);
router.get(
  "/:accountId/checkFollowingStatus",
  accountController.checkFollowingStatus
);

const accountRoutes = router;
export default accountRoutes;
