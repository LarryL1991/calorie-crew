// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../../server/User";
import dbConnect from "../../../server/db";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const users = await User.find(
      { username: { $ne: "" } },
      { username: true, email: true, password: true, dfj: true },
      { limit: 10, sort: { name: "asc" } }
    );

    res.status(200).json({ currentusers: users });
  } else if (req.method === "POST") {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
