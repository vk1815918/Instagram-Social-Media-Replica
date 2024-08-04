import { Router } from "express";
import searchController from "../controller/search.controller.js";
const router = Router();
import auth from "../middleware/auth.js";
// Private Routes 👇🏼
router.get("/user", auth, searchController.getSearchResult);

const searchRoutes = router;
export default searchRoutes;
