import express from "express";
import validator from "express-validator";
const { check } = validator;
import { registerUser } from "../controllers/userControllers.js";

const router = express.Router();
// register a user
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  registerUser
);

export default router;
