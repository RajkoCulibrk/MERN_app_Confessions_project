import Comment from "../models/Comments.js";
import Confession from "../models/Confession.js";
import User from "../models/User.js";
import validator from "express-validator";
const { validationResult } = validator;
export const postComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = req.user.id;
  const author = (await User.findById(user)).name;
  console.log(author, "ovde");
  const { confession, comment, body } = req.body;
  let commentToBeSaved = { user, body, author };
  if (comment) {
    commentToBeSaved.comment = comment;
    await Comment.findByIdAndUpdate(comment, { $inc: { comments: 1 } });
  }
  if (confession) {
    commentToBeSaved.confession = confession;
    console.log(confession);
    await Confession.findByIdAndUpdate(confession, { $inc: { comments: 1 } });
  }

  try {
    console.log(commentToBeSaved);
    let comment = new Comment(commentToBeSaved);
    comment = await comment.save();
    return res.status(201).json(comment);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

export const getComments = async (req, res) => {
  const confession = req.params.id;
  try {
    const comments = await Comment.find({ confession }).sort("-created_at");
    res.json(comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};
export const getSubComments = async (req, res) => {
  const comment = req.params.id;
  try {
    const comments = await Comment.find({ comment });
    res.json(comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("no such comment found");
    }
    if (String(comment.user) !== String(req.user.id)) {
      console.log(typeof Number(comment.user), req.user.id);
      throw new Error("unauthorized request");
    }
    res.status(400).send();
    await Comment.findByIdAndDelete(commentId);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};
