import Meal from "../../../../../../models/Meal.js";
import dbConnect from "../../../../../../server/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).end(); // Method not allowed
  }

  try {
    // Connect to the MongoDB database
    await dbConnect();

    // Extract relevant data from the request body
    const { user_id, date, meal_type, food_items, total_calories } = req.body;

    console.log(food_items);
    // Search for the existing meal based on user_id, date, and meal_type
    const existingMeal = await Meal.findOne({
      user_id,
      date,
      meal_type,
    });

    if (!existingMeal) {
      console.log("didn't find meal!");
      return res.status(404).json({ error: "Meal not found" });
    }

    // Update the existing meal document with the new data
    existingMeal.food_items = food_items;
    existingMeal.total_calories = total_calories;

    // Save the updated meal to the database
    await existingMeal.save();

    // Send a success response
    res
      .status(200)
      .json({ message: "Meal updated successfully", meal: existingMeal });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ error: "Failed to update the meal" });
  }
}
