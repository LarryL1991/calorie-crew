import Meal from "../../../../../../models/Meal.js";
import dbConnect from "../../../../../../server/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      // Connect to the MongoDB database
      await dbConnect();

      console.log("asdasd");

      // Extract relevant data from the request body
      const { user_id, date, meal_type } = req.body;

      console.log({ user_id, date, meal_type });

      // Search for the existing meal based on user_id, date, and meal_type
      const existingMeal = await Meal.findOneAndDelete({
        user_id,
        date,
        meal_type,
      });

      if (!existingMeal) {
        console.log("meal not found");
        return res.status(404).json({ error: "Meal not found" });
      }
      console.log("meal found");

      // Send a success response
      res.status(200).json({ message: "Meal deleted successfully" });
    } catch (error) {
      // Handle errors and send an error response
      console.error(error);
      res.status(500).json({ error: "Failed to delete the meal" });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
