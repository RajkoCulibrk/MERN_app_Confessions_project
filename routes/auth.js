import express from "express";
import validator from "express-validator";
const { check } = validator;
import { loginUser } from "../controllers/userControllers.js";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();
// get logged in user
router
  .get("/", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  })
  //login user
  .post(
    "/",
    [
      check("email", "Please include a valid email").isEmail(),
      check("password", "password is required").notEmpty(),
    ],
    loginUser
  );

export default router;
