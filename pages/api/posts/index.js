import client from "@/db/mongodb"
import getUserFromSession from "@/middlewares/getUserFromSession"

export default async function handler(req, res) {
  const { title, content } = req.body
  const db = await client.db("next-posts")

  switch (req.method) {
    case "GET": {
      const posts = await db.collection("posts").find().toArray()

      return res.status(200).json({ posts })
    }
    case "POST": {
      if (!title?.trim() || !content?.trim()) {
        return res.status(405).json({ message: "not enough data" })
      }

      await getUserFromSession(req, res)

      const { insertedId } = await db.collection("posts").insertOne({ title, content, authorId: req.user._id })

      console.log(insertedId)

      const post = await db.collection("posts").findOne({ _id: insertedId })

      return res.status(200).json({
        message: 'successfully created',
        post: post
      })
    }
    default: {
      return res.status(405).json({ status: "fail", message: `${req.method} is not allowed` })
    }
  }
}