import express from "express";
import validator from "express-validator";
const { check } = validator;
import {
  createConffesion,
  likeDislikeConfessions,
} from "../controllers/confessionController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  [check("body", "You outta have something to confess").not().isEmpty(), auth],
  createConffesion
);

router.get("/:id", auth, likeDislikeConfessions);

export default router;
