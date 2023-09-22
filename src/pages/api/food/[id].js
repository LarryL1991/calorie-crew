import foodSchema from "../../../models/Food.js";
import dbConnect from "../../../../server/db";

export default async function foodById(req, res) {
  const { id } = req.query;
  await dbConnect();
  const food = await foodSchema.findById(id);

  if (!food) {
    res.status(404).json({ message: "Food not found" });
  }

  if (req.method === "GET") {
    res.status(200).json(food);
  } else if (req.method === "PUT") {
    const { calories, name, measurement } = req.body; // Include measurement in the destructuring
    food.name = name;
    food.calories = calories;
    food.measurement = measurement; // Update the measurement field
    await food.save();
    console.log(food);
    res.status(200).json(food);
  } else if (req.method === "DELETE") {
    const deleteResult = await foodSchema.findByIdAndDelete(id);
    if (deleteResult) {
      res
        .status(203)
        .json({ message: "Food deleted", itemDeleted: deleteResult });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
