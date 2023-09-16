import mealSchema from "../../../models/Meal.js";
import dbConnect from "../../../../server/db";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    console.log("got POST request");

    const { user_id, daily } = req.body;
    console.log(user_id);
    console.log(daily.date);
    console.log(daily);
    console.log(daily.foods);

    const userMeal = await mealSchema.findOne({
      user_id,
      "daily.date": daily.date,
    });

    if (userMeal) {
      // Update the existing meal entry for the current date and meal type
      console.log("found!");
      userMeal.daily = daily;
      await userMeal.save();
      res.status(200).json(userMeal);
    } else {
      // Create a new meal entry for the current date and meal type
      console.log("not found!");
      const newMeal = new mealSchema({
        user_id,
        daily: {
          date: daily.date,
          meals: [
            {
              type: daily.meals.type,
              foods: [daily.meals.foods],
            },
          ],
        },
      });
      await newMeal.save();
      res.status(201).json(newMeal);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
