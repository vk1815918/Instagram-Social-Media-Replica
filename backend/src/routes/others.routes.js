import { Router } from "express";
import auth from "../middleware/auth.js";
import othersController from "../controller/others.controller.js";

const router = Router();

router.get("/gifs", othersController.getGifs);
router.get("/explore", othersController.explore);
router.get("/suggested", auth, othersController.suggested);

const othersRoutes = router;
export default othersRoutes;
