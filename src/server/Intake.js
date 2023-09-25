import mongoose from "mongoose";

const IntakeSchema = new mongoose.Schema({
  user_id: {
    type: String
  },
  date: {
    type: Date
  },
  meal_type: {
    type: String
  },
  food_items: {
    type: Array
  },
  total_calories: {
    type: Number
  }
});

export default mongoose.models.User ||
  mongoose.model("Intake", IntakeSchema, "intake-db");
