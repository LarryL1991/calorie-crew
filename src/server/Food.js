import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  calories: {
    type: Number,
  },
});

export default mongoose.models.User ||
  mongoose.model("Food", FoodSchema, "food-db");
