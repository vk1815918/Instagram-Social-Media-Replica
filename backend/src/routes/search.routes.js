import { Router } from "express";
import searchController from "../controller/search.controller.js";
const router = Router();

// Private Routes 👇🏼
router.get("/user",  searchController.getSearchResult);

const searchRoutes = router;
export default searchRoutes;
