import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  dfj: {
    type: String,
  }
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema, "users");
