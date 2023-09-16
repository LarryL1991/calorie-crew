import mealSchema from "../../../models/Meal.js";
import dbConnect from "../../../../server/db";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    console.log("got POST request");
    const newMealSchema = new mealSchema(req.body);
    await newSchema.save();
    res.status(201).json(newMealSchema);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
