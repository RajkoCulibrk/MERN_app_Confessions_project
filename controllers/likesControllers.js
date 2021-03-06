/* import Like from "../models/Likes.js"; */
import Like from "../models/Likes.js";
import Dislike from "../models/Dislikes.js";
import Confession from "../models/Confession.js";
import Comment from "../models/Comments.js";

//for liking confessions, removing the like of a confession if the confession has already been liked,increments the like count of the cnfession,removes a dislike and adds a like if a confession has been disliked and decrements the number of dislikes of a confession
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
      }
      if (like) {
        await Confession.findByIdAndUpdate(confession, {
          $inc: { likes: 1 },
        });
      }

      res.status(201).send();
    } else {
      let muki = await Like.findOneAndDelete({ user, confession });
      if (muki) {
        await Confession.findByIdAndUpdate(confession, { $inc: { likes: -1 } });
      }

      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
//the same as addRemoveLikeConfession but only for dislikes
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

      res.status(201).send();
    } else {
      let removedDislike = await Dislike.findOneAndDelete({ user, confession });
      if (removedDislike) {
        await Confession.findByIdAndUpdate(confession, {
          $inc: { dislikes: -1 },
        });
      }

      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
//the same as addRemoveLikeConfession but only for likes of comments
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
      }
      if (like) {
        await Comment.findByIdAndUpdate(comment, {
          $inc: { likes: 1 },
        });
      }

      res.status(201).send();
    } else {
      let removedLike = await Like.findOneAndDelete({ user, comment });
      if (removedLike) {
        await Comment.findByIdAndUpdate(comment, {
          $inc: { likes: -1 },
        });
      }

      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
//the same as addRemoveLikeConfession but only for dislikes of comments
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

      res.status(201).send();
    } else {
      let removedDislike = await Dislike.findOneAndDelete({ user, comment });
      if (removedDislike) {
        await Comment.findByIdAndUpdate(comment, {
          $inc: { dislikes: -1 },
        });
      }

      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//checks if the confessions or a comment has been liked , disliked or neither and sends a response in json fromat like this one { liked: true, disliked: false }
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
    res.status(500).json({ msg: err.message });
  }
};
