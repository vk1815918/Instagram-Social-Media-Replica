import { Router } from "express";
import notificationController from "../controller/notification.controller.js";

const router = Router();

router.get("/", notificationController.getAllNotifications);
router.put("/makeAsRead",  notificationController.makeAsReadNotifications);

const notificationRoutes = router;
export default notificationRoutes;
