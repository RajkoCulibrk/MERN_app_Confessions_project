import mongoose from "mongoose";

const LikesSchema = mongoose.Schema(
  {
    confession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "confessions",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { "strict": false }
);
//adding a compound index and marking it as true thus ensuring that there can be only one like per user added for a confession or a comment
LikesSchema.index(
  { "confession": 1, "comment": 1, "user": 1 },
  { "unique": true }
);

export default mongoose.model("like", LikesSchema);
