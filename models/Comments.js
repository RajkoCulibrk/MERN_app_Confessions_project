import mongoose from "mongoose";

const CommentsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  confession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "confessions",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
  },
  body: {
    type: String,
    required: true,
  },
});

export default mongoose.model("comment", CommentsSchema);
