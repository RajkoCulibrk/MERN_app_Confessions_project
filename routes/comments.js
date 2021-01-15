import express from "express";
import {
  getComments,
  postComment,
  getSubComments,
  deleteComment,
} from "../controllers/commentsControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, postComment);
router.delete("/:id", auth, deleteComment);
router.get("/confession/:id", getComments);
router.get("/subcomment/:id", getSubComments);

export default router;
