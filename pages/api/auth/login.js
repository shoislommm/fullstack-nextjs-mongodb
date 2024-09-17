// import { withIronSession } from "next-iron-session"
import { getIronSession } from "iron-session"
import { ObjectId } from "mongodb"
import client from "@/db/mongodb"


export default async function handler(req, res) {
  try {
    const { username, password } = req.body

    const db = await client.db("next-posts")
    const user = await db.collection("users").findOne({ username: username, password: password })

    if (!user) {
      return res.json("User not found")
    }

    const session = await getIronSession(req, res, {
      password: "bTdsnLMRnMzgcYMvrFpMXjeyjZKWYZoa",
      cookieName: "user-session"
    });

    session.username = username;
    session.password = password

    await session.save();

    await db.collection("sessions").insertOne({
      userId: new ObjectId(user._id),
      createdAt: new Date(),
    })

    res.status(200).json({ message: "logged in" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'failed to login' });
  }
}