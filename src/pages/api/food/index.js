import foodSchema from "../../../models/Food.js";
import dbConnect from "../../../server/db";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { query } = req.query;

    try {
      // Perform a case-insensitive search for food items matching the query
      const foodSelections = await foodSchema
        .find({
          name: { $regex: new RegExp(query, "i") }, // Case-insensitive search
        })
        .limit(10); // Limit the results to a reasonable number

      res.status(200).json({ foodSelections });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  } else if (req.method === "POST") {
    const newFoodSchema = new foodSchema(req.body);
    console.log(req.body);
    await newFoodSchema.save();
    res.status(201).json(newFoodSchema);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
