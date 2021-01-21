import express from "express";
import {
  addRemoveLikeConfession,
  likeDislikeComment,
  addRemoveDislikeConfession,
  likedDisliked,
} from "../controllers/likesControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/confession/like/:id", auth, addRemoveLikeConfession);
router.post("/confession/dislike/:id", auth, addRemoveDislikeConfession);
router.post("/", auth, likedDisliked);

router.post("/comment/like/:id", auth, likeDislikeComment);

export default router;
