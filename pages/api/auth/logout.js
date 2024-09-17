import getUserFromSession from '@/middlewares/getUserFromSession';
import { ObjectId } from 'mongodb';
import client from '@/db/mongodb';

export default async function handler(req, res) {
  try {
    await getUserFromSession(req, res);

    await req.session.destroy()

    const db = await client.db("next-posts")
    await db.collection("sessions").deleteOne({
      userId: new ObjectId(req.user._id),
    })


    res.status(200).json({ message: "logged out" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'failed to logout' });
  }
}

