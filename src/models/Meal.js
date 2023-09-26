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
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Food", // Reference to the Food model
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
