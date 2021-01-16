import express from "express";
import {
  likeDislikeConfession,
  likeDislikeComment,
} from "../controllers/likesControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/confession/:id", auth, likeDislikeConfession);
router.post("/comment/:id", auth, likeDislikeComment);

export default router;
