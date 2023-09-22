import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  // Add other fields as needed
});

const mealSchema = new mongoose.Schema({
  user_id: String,
  daily: {
    date: Date,
    breakfast: [foodSchema],
    lunch: [foodSchema],
    dinner: [foodSchema],
    snack: [foodSchema],
  },
});

export default mongoose.models.mealSchema ||
  mongoose.model("mealSchema", mealSchema, "intake-db");
