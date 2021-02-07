import Confession from "../models/Confession.js";
import User from "../models/User.js";
import validator from "express-validator";
const { validationResult } = validator;

// creates a confession if the user is logged in
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
    return res.status(500).send("server error");
  }
};

//deletes a confession if it belongs to the user
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

//gets the confessions , implements pagination sorting and filtering
export const getConfessions = async (req, res) => {
  let page = req.body.page;
  let limit = 5;
  let skip = (page - 1) * limit;
  let sortOrder = req.body.sortOrder;
  let sortBy = req.body.sortBy;

  try {
    const c = Confession.find()
      .sort([
        [sortBy, sortOrder],
        ["_id", -1],
      ])
      .skip(skip)
      .limit(limit);
    let confessions = await c;

    let numConfessions = await Confession.countDocuments();

    if (limit * page > numConfessions) {
      return res.status(200).json({ confessions, end: true });
    }

    res.status(200).json({ confessions, end: false });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//gets the data about only one confession
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
