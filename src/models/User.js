const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
  },
  password: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Meal ||
  mongoose.model("userSchema", userSchema, "user-db");
