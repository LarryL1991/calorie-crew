import dbConnect from "../../../../server/db";
import Intake from "../../../../server/Intake";

export default async function handler(req, res) {
  const { id, date } = req.query;


  await dbConnect();

  if (req.method === "GET") {
  try {
    const theDate = new Date(date);

    const startDate = new Date(theDate);
    startDate.setHours(0, 0, 0, 0); // Set the start time to 00:00:00.000
    const endDate = new Date(theDate);
    endDate.setHours(23, 59, 59, 999); // Set the end time to 23:59:59.999

    console.log({ theDate, startDate, endDate, id });
    
    
        const dailyIntake = await Intake.find(
          { user_id: { $eq: id }, date: theDate },
          { user_id: true, date: true, total_calories: true, meal_type: true},
        );

        console.log(dailyIntake);
    
        res.status(200).json({ totalCalories: dailyIntake });
      }catch (error){
        res.status(500).json({message: "Ugh"})
      } 
    }
}
    