import client from "@/db/mongodb"
import { ObjectId } from "bson"
import getUserFromSession from "@/middlewares/getUserFromSession"


export default async function handler(req, res) {
  const { title, content } = req.body
  const { id } = req.query
  const db = await client.db("next-posts")

  switch (req.method) {
    case "GET": {
      const post = await db.collection("posts").findOne({ _id: new ObjectId(id) })

      return res.status(200).json({ post })
    }
    case "PUT": {
      await getUserFromSession(req, res)

      await db.collection("posts").updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, content } }
      )

      const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });

      return res.json({
        message: 'successfully updated',
        post: post
      })
    }
    case "DELETE": {

      const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });

      await db.collection('posts').deleteOne({ _id: new ObjectId(id) });

      console.log(post)
      return res.json({ message: 'successfully deleted', post: post })
    }
    default: {
      return res.status(405).json({ status: "fail", message: `${req.method} is not allowed` })
    }
  }
}