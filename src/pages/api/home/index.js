// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Food from "../../../server/Food";
import dbConnect from "../../../server/db";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const foodItems = await Food.find(
      { name: { $ne: "" } },
      { name: true, calories: true},
      { limit: 10, sort: { name: "asc" } }
    );

    res.status(200).json({ foodList: foodItems });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
