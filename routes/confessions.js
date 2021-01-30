import express from "express";
import validator from "express-validator";
const { check } = validator;
import {
  createConffesion,
  deleteConfession,
  getConfessions,
  getSingleConfession,
} from "../controllers/confessionController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", getConfessions);
router.get("/:id", getSingleConfession);

router.post(
  "/",
  [check("body", "You outta have something to confess").not().isEmpty(), auth],
  createConffesion
);

router.delete("/:id", auth, deleteConfession);

export default router;
