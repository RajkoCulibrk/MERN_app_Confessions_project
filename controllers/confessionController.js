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
    const { name } = await User.findById(req.user.id);
    const confession = new Confession({
      user: req.user.id,
      body,
      author: name,
    });
    await confession.save();
    return res.json(confession);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("server error");
  }
};

export const deleteConfession = async (req, res) => {
  const user = req.user.id;
  const confessionId = req.params.id;
  try {
    const confession = await Confession.findById(confessionId);
    if (!confession) {
      throw new Error("no such confession found");
    }
    if (toString(user) !== toString(confession._id)) {
      throw new Error("unauthorised request");
    }
    await Confession.findByIdAndDelete(confessionId);
    return res.status(204).send();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getConfessions = async (req, res) => {
  console.log("ffffffffffff");
  try {
    const confessions = await Confession.find().sort("-created_at");
    res.status(200).json(confessions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getSingleConfession = async (req, res) => {
  const id = req.params.id;

  try {
    const confession = await Confession.findById(id);
    if (!confession) {
      res.status(404).json({ msg: err.message });
    }
    res.status(200).json({ confession });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
