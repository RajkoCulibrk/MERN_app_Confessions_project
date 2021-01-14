import express from "express";
import validator from "express-validator";
const { check, validationResult } = validator;
import auth from "../middleware/auth.js";
import Confession from "../models/Confession.js";

const router = express.Router();

router.post(
  "/",
  [check("body", "You outta have something to confess").not().isEmpty(), auth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { body } = req.body;
    try {
      const confession = new Confession({ user: req.user.id, body });
      await confession.save();
      return res.json(confession);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("server error");
    }
  }
);

export default router;
