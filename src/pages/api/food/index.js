import foodSchema from "../../../../public/models/Food.js";
import dbConnect from "../../../../server/db";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const foodSelections = await foodSchema.find({}); //{ name: { $ne: "" } },{ name: true },{ limit: 10, sort: { name: "asc" } }

    res.status(200).json({ foodSelections });
  } else if (req.method === "POST") {
    const newFoodSchema = new foodSchema(req.body);
    await newFoodSchema.save();
    res.status(201).json(newFoodSchema);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
