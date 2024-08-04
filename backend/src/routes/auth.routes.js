import { Router } from "express";
import authController from "../controller/auth.controller.js";

const router = Router();

router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh_token", authController.refreshToken);

const authRoutes = router;
export default authRoutes;
