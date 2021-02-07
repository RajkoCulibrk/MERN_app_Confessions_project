import express from "express";
import {
  getComments,
  postComment,
  getSubComments,
  deleteComment,
} from "../controllers/commentsControllers.js";
import auth from "../middleware/auth.js";
import validator from "express-validator";
const { check } = validator;
const router = express.Router();

router.post(
  "/",
  auth,
  [check("body", "Too short for it to be a comment.").isLength({ min: 5 })],
  postComment
);
router.delete("/:id", auth, deleteComment);
router.get("/confession/:id", getComments);
router.get("/subcomment/:id", getSubComments);

export default router;
