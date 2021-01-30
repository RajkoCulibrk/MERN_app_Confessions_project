import mongoose from "mongoose";

const DislikesSchema = mongoose.Schema(
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

DislikesSchema.index(
  { "confession": 1, "comment": 1, "user": 1 },
  { "unique": true }
);

export default mongoose.model("dislike", DislikesSchema);
