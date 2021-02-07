import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likedConfessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
// for hashing the password
UserSchema.methods.hash = async function (password) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(password, salt);
};
// for comparing passwords provided by the user when logging in and comparing it with the hashed password in the database
UserSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("user", UserSchema);
