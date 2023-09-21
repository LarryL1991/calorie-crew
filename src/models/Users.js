import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  // Other nutritional information fields
});

export default mongoose.models.userSchema ||
  mongoose.model("userSchema", userSchema, "user-db");