import mongoose from "mongoose";

const CommentsSchema = mongoose.Schema(
  {
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
    author: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

export default mongoose.model("comment", CommentsSchema);
