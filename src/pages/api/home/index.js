import Intake from "../../../server/Intake";
import dbConnect from "../../../server/db";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const dailyIntake = await Intake.find(
      { user_id: { $ne: "" } },
      { user_id: true, date: true, total_calories: true},
      { limit: 10, sort: { name: "asc" } }
    );

    res.status(200).json({ totalCalories: dailyIntake });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
