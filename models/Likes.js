import mongoose from "mongoose";

const LikesSchema = mongoose.Schema({
  confesseion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "confessions",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: comments,
  },
});

export default mongoose.model("like", LikesSchema);
