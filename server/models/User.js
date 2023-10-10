import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
