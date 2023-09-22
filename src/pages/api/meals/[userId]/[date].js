import dbConnect from "../../../../../server/db";
import mealSchema from "../../../../models/Meal";

export default async function handler(req, res) {
  const { userId, date } = req.query;

  try {
    await dbConnect();

    const dateObject = new Date(date);
    dateObject.setHours(0, 0, 0, 0);
    const isoString = dateObject.toISOString();
    const formattedDate = isoString.replace("Z", "+00:00");

    const meals = await mealSchema.find({
      user_id: userId, // Assuming you have user authentication in place
      date: dateObject, // Use the formatted date string
    });

    res.status(200).json({ meals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching meals" });
  }
}
