/* import Like from "../models/Likes.js"; */
import Like from "../models/Likes.js";
export const likeDislikeConfession = async (req, res) => {
  const confession = req.params.id;
  const user = req.user.id;
  try {
    let exists = await Like.findOne({ user, confession });
    if (exists) {
      await Like.findOneAndDelete({ user, confession });
      res.status(204).send();
    } else {
      let like = await new Like({ user, confession });
      like.save();
      res.status(201).send();
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};

export const likeDislikeComment = async (req, res) => {
  const comment = req.params.id;
  const user = req.user.id;
  try {
    let exists = await Like.findOne({ user, comment });
    if (exists) {
      await Like.findOneAndDelete({ user, comment });
      res.status(204).send();
    } else {
      let like = await new Like({ user, comment });
      like.save();
      res.status(201).send();
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};
