import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  // Other nutritional information fields
});

export default mongoose.models.foodSchema ||
  mongoose.model("foodSchema", foodSchema, "food-db");
