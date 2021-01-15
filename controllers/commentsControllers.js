import Comment from "../models/Comments.js";
export const postComment = async (req, res) => {
  const user = req.user.id;
  const { confession, comment, body } = req.body;
  let commentToBeSaved = { user, body };
  if (comment) {
    commentToBeSaved.comment = comment;
  }
  if (confession) {
    commentToBeSaved.confession = confession;
    console.log(confession);
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
    const comments = await Comment.find({ confession });
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
