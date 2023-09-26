import dbConnect from "../../../../server/db";
import mealSchema from "../../../../models/Meal";

export default async function handler(req, res) {
  const { userId, date } = req.query;

  try {
    await dbConnect();

    const oneDayMilliseconds = 24 * 60 * 60 * 1000;

    const theDate = new Date(date);
    const oneDayBack = new Date(theDate.getTime() + oneDayMilliseconds);
    console.log({ theDate, oneDayBack });

    const startDate = new Date(oneDayBack);
    startDate.setHours(0, 0, 0, 0); // Set the start time to 00:00:00.000
    const endDate = new Date(oneDayBack);
    endDate.setHours(23, 59, 59, 999); // Set the end time to 23:59:59.999

    console.log({ theDate, startDate, endDate });

    const meals = await mealSchema.find({
      user_id: userId,
      date: {
        $gte: startDate, // Greater than or equal to the start of the day
        $lte: endDate, // Less than or equal to the end of the day
      },
    });

    res.status(200).json({ meals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching meals" });
  }
}
