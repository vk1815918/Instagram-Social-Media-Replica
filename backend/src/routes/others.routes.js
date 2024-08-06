import { Router } from "express";
import othersController from "../controller/others.controller.js";

const router = Router();

router.get("/gifs", othersController.getGifs);
router.get("/explore", othersController.explore);
router.get("/suggested",  othersController.suggested);

const othersRoutes = router;
export default othersRoutes;
