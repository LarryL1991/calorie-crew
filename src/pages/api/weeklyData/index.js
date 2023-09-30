import dbConnect from "../../../server/db";
import mealSchema from "../../../models/Meal";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method not allowed
  }

  try {
    await dbConnect();

    const { userId, startDate, endDate } = req.query;

    const weeklyData = await mealSchema.find({
      user_id: userId,
      date: {
        $gte: new Date(startDate), // Greater than or equal to the start date
        $lte: new Date(endDate), // Less than or equal to the end date
      },
    });

    res.status(200).json(weeklyData);
  } catch (error) {
    console.error("Error fetching weekly data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching weekly data" });
  }
}
