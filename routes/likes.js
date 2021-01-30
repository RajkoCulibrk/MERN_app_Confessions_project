import express from "express";
import {
  addRemoveLikeConfession,
  addRemoveDislikeConfession,
  likedDisliked,
  addRemoveLikeComment,
  addRemoveDislikeComment,
} from "../controllers/likesControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/confession/like/:id", auth, addRemoveLikeConfession);
router.post("/comment/like/:id", auth, addRemoveLikeComment);
router.post("/confession/dislike/:id", auth, addRemoveDislikeConfession);
router.post("/comment/dislike/:id", auth, addRemoveDislikeComment);
router.post("/", auth, likedDisliked);

export default router;
