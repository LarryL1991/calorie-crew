import Meal from "../../../models/Meal.js";
import dbConnect from "../../../../server/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed
  }

  try {
    // Connect to the MongoDB database
    await dbConnect();

    // Create a new meal document based on the request body
    const newMeal = new Meal(req.body);
    console.log(newMeal);

    // Save the meal to the database
    await newMeal.save();

    // Send a success response
    res.status(201).json({ message: "Meal saved successfully", meal: newMeal });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: "Failed to save the meal" });
  }
}
