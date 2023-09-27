import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  meal_type: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snack"],
    required: true,
  },
  food_items: [
    {
      name: {
        type: String,
        required: true,
      },
      calories: {
        type: String,
        required: true,
      },
      measurement: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total_calories: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.mealSchema ||
  mongoose.model("mealSchema", mealSchema, "intake-db");
