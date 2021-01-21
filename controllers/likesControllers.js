/* import Like from "../models/Likes.js"; */
import Like from "../models/Likes.js";
import Dislike from "../models/Dislikes.js";
import Confession from "../models/Confession.js";
export const addRemoveLikeConfession = async (req, res) => {
  const confession = req.params.id;
  const user = req.user.id;
  try {
    let exists = await Like.findOne({ user, confession });
    if (exists) {
      await Confession.findByIdAndUpdate(confession, { $inc: { likes: -1 } });
      await Like.findOneAndDelete({ user, confession });
      console.log("removed like");
      res.status(204).send();
    } else {
      await Confession.findByIdAndUpdate(confession, { $inc: { likes: 1 } });
      let like = await new Like({ user, confession });
      await like.save();
      const removedDislike = await Dislike.findOneAndDelete({
        user,
        confession,
      });
      if (removedDislike) {
        await Confession.findByIdAndUpdate(confession, {
          $inc: { dislikes: -1 },
        });
      }
      console.log(removedDislike);
      console.log("added like");
      res.status(201).send();
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};
export const addRemoveDislikeConfession = async (req, res) => {
  const confession = req.params.id;
  const user = req.user.id;
  try {
    let exists = await Dislike.findOne({ user, confession });
    if (exists) {
      await Confession.findByIdAndUpdate(confession, {
        $inc: { dislikes: -1 },
      });
      await Dislike.findOneAndDelete({ user, confession });
      console.log("removed dislike");
      res.status(204).send();
    } else {
      await Confession.findByIdAndUpdate(confession, { $inc: { dislikes: 1 } });
      let dislike = await new Dislike({ user, confession });
      await dislike.save();
      const removedLike = await Like.findOneAndDelete({ user, confession });
      if (removedLike) {
        await Confession.findByIdAndUpdate(confession, {
          $inc: { likes: -1 },
        });
      }
      console.log("added dislike");
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

export const likedDisliked = async (req, res) => {
  const { confession, comment } = req.body;
  const user = req.user.id;

  try {
    if (!confession && !comment) {
      throw new Error("provide comment id or confession id");
    }
    if (confession) {
      let liked = await Like.find({ user, confession });
      let disliked = await Dislike.find({ user, confession });

      if (liked[0]) {
        res.json({ liked: true, disliked: false });
      } else if (disliked[0]) {
        res.json({ liked: false, disliked: true });
      } else {
        res.json({ liked: false, disliked: false });
      }
    }
    if (comment) {
      let liked = await Like.find({ user, comment });
      if (liked[0]) {
        res.json({ liked: true });
      } else {
        res.json({ liked: false });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};
