import client from "@/db/mongodb"

export default async function handler(req, res) {
  try {
    const { username, password } = req.body

    if (!username?.trim() || !password?.trim()) {
      return res.json("not enough data")
    }

    const db = await client.db("next-posts")
    await db.collection("users").insertOne({ username: username, password: password })

    res.status(200).json({ message: "signed up" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'failed to sign up' });
  }
}