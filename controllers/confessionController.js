import Confession from "../models/Confession.js";
import User from "../models/User.js";
import validator from "express-validator";
const { validationResult } = validator;
export const createConffesion = async (req, res) => {
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
};

export const likeDislikeConfessions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const confession = req.params.id;
  try {
    let user = await User.findById(req.user.id);
    if (user.likedConfessions.includes(confession)) {
      user = await user.updateOne({ $pull: { likedConfessions: confession } });
      return res.json(user);
    } else {
      user = await user.updateOne({ $push: { likedConfessions: confession } });
      return res.json(user);
    }
  } catch (err) {
    console.log(err.message);
    return res.send(err.message);
  }
};
