import express from "express";
import { likeDislike } from "../controllers/likesControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/", auth, likeDislike);

export default router;
