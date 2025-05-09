import { Router } from "express";
import notificationController from "../controller/notification.controller.js";

const router = Router();

router.get("/", notificationController.getAllNotifications);

router.put("/mark-as-read", notificationController.markAsReadNotifications);

export default router;
