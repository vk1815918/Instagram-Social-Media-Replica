import { Router } from "express";
import auth from "../middleware/auth.js";
import notificationController from "../controller/notification.controller.js";

const router = Router();

router.get("/", auth, notificationController.getAllNotifications);
router.put("/makeAsRead", auth, notificationController.makeAsReadNotifications);

const notificationRoutes = router;
export default notificationRoutes;
