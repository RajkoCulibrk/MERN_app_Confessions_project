import Comment from "../models/Comments.js";
import Confession from "../models/Confession.js";
import User from "../models/User.js";
import validator from "express-validator";
const { validationResult } = validator;

//post comment : posts comment and increments the number of comments on a confessions or a comment
export const postComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = req.user.id;
  const author = (await User.findById(user)).name;

  const { confession, comment, body } = req.body;
  let commentToBeSaved = { user, body, author };
  if (comment) {
    commentToBeSaved.comment = comment;
    await Comment.findByIdAndUpdate(comment, { $inc: { comments: 1 } });
  }
  if (confession) {
    commentToBeSaved.confession = confession;

    await Confession.findByIdAndUpdate(confession, { $inc: { comments: 1 } });
  }

  try {
    let comment = new Comment(commentToBeSaved);
    comment = await comment.save();
    return res.status(201).json(comment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/// gets all the comments of a confession or comment
export const getComments = async (req, res) => {
  const confession = req.params.id;
  try {
    const comments = await Comment.find({ confession }).sort("-created_at");
    res.json(comments);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//gets the subcomments basiclu comments of a comment
export const getSubComments = async (req, res) => {
  const comment = req.params.id;
  try {
    const comments = await Comment.find({ comment });
    res.json(comments);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//deletes the  comment if the comment belongs to the user who posted it
export const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("no such comment found");
    }
    if (String(comment.user) !== String(req.user.id)) {
      throw new Error("unauthorized request");
    }
    res.status(400).send();
    await Comment.findByIdAndDelete(commentId);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
