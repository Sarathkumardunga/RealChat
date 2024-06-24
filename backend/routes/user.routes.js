import express from "express";
import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

//We only want to have one router to get the users to the sidebar
router.get("/", protectRoute, getUsersForSidebar);

export default router;