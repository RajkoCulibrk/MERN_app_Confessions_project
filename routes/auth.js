import express from "express";
import validator from "express-validator";
const { check } = validator;
import { loginUser } from "../controllers/userControllers.js";

const router = express.Router();
// get logged in user
router.get("/", (req, res) => {
  res.send("get a user");
});

//login user
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "password is required").exists(),
  ],
  loginUser
);

export default router;
