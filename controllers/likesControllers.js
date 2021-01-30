/* import Like from "../models/Likes.js"; */
import Like from "../models/Likes.js";
import Dislike from "../models/Dislikes.js";
import Confession from "../models/Confession.js";
import Comment from "../models/Comments.js";
export const addRemoveLikeConfession = async (req, res) => {
  const confession = req.params.id;
  const user = req.user.id;
  try {
    let exists = await Like.findOne({ user, confession });

    if (!exists) {
      let like = new Like({ user, confession });
      like = await like.save();

      const removedDislike = await Dislike.findOneAndDelete({
        user,
        confession,
      });
      if (removedDislike) {
        await Confession.findByIdAndUpdate(confession, {
          $inc: { dislikes: -1 },
        });
        console.log(removedDislike, "ddd");
      }
      if (like) {
        await Confession.findByIdAndUpdate(confession, {
          $inc: { likes: 1 },
        });
      }
      console.log("added like");
      res.status(201).send();
    } else {
      let muki = await Like.findOneAndDelete({ user, confession });
      if (muki) {
        await Confession.findByIdAndUpdate(confession, { $inc: { likes: -1 } });
      }
      console.log("removed like");
      res.status(204).send();
    }
  } catch (err) {
    console.log(err.message, "error");
    res.status(500).json({ msg: err.message });
  }
};
export const addRemoveDislikeConfession = async (req, res) => {
  const confession = req.params.id;
  const user = req.user.id;
  try {
    let exists = await Dislike.findOne({ user, confession });
    if (!exists) {
      let dislike = new Dislike({ user, confession });
      dislike = await dislike.save();

      const removedLike = await Like.findOneAndDelete({ user, confession });
      if (removedLike) {
        await Confession.findByIdAndUpdate(confession, {
          $inc: { likes: -1 },
        });
      }
      if (dislike) {
        await Confession.findByIdAndUpdate(confession, {
          $inc: { dislikes: 1 },
        });
      }
      console.log("added dislike");
      res.status(201).send();
    } else {
      let removedDislike = await Dislike.findOneAndDelete({ user, confession });
      if (removedDislike) {
        await Confession.findByIdAndUpdate(confession, {
          $inc: { dislikes: -1 },
        });
      }
      console.log("removed dislike");
      res.status(204).send();
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};

export const addRemoveLikeComment = async (req, res) => {
  const comment = req.params.id;
  const user = req.user.id;
  try {
    let exists = await Like.findOne({ user, comment });

    if (!exists) {
      let like = new Like({ user, comment });
      like = await like.save();
      const removedDislike = await Dislike.findOneAndDelete({
        user,
        comment,
      });
      if (removedDislike) {
        await Comment.findByIdAndUpdate(comment, {
          $inc: { dislikes: -1 },
        });
        console.log(removedDislike, "ddd");
      }
      if (like) {
        await Comment.findByIdAndUpdate(comment, {
          $inc: { likes: 1 },
        });
      }
      console.log("added like");
      res.status(201).send();
    } else {
      let removedLike = await Like.findOneAndDelete({ user, comment });
      if (removedLike) {
        await Comment.findByIdAndUpdate(comment, {
          $inc: { likes: -1 },
        });
      }
      console.log("removed like");
      res.status(204).send();
    }
  } catch (err) {
    console.log(err.message, "error");
    res.status(500).json({ msg: err.message });
  }
};

export const addRemoveDislikeComment = async (req, res) => {
  const comment = req.params.id;
  const user = req.user.id;
  try {
    let exists = await Dislike.findOne({ user, comment });
    if (!exists) {
      let dislike = new Dislike({ user, comment });
      dislike = await dislike.save();
      const removedLike = await Like.findOneAndDelete({ user, comment });
      if (removedLike) {
        await Comment.findByIdAndUpdate(comment, {
          $inc: { likes: -1 },
        });
      }
      if (dislike) {
        await Comment.findByIdAndUpdate(comment, { $inc: { dislikes: 1 } });
      }
      console.log("added dislike");
      res.status(201).send();
    } else {
      let removedDislike = await Dislike.findOneAndDelete({ user, comment });
      if (removedDislike) {
        await Comment.findByIdAndUpdate(comment, {
          $inc: { dislikes: -1 },
        });
      }
      console.log("removed dislike");
      res.status(204).send();
    }
  } catch (err) {
    console.log(err, "adf");
    res.status(500).json({ msg: err.message });
  }
};

export const likedDisliked = async (req, res) => {
  console.log("requested");
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
      let disliked = await Dislike.find({ user, comment });

      if (liked[0]) {
        res.json({ liked: true, disliked: false });
      } else if (disliked[0]) {
        res.json({ liked: false, disliked: true });
      } else {
        res.json({ liked: false, disliked: false });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};
