import { getIronSession } from 'iron-session';
import client from '@/db/mongodb';

export default async function getUserFromSession(req, res) {
  const session = await getIronSession(req, res, {
    password: "bTdsnLMRnMzgcYMvrFpMXjeyjZKWYZoa",
    cookieName: "user-session"
  });

  // if (Object.values(session).length == 0) {
  //   throw new Error("session is not found")
  // }

  const db = await client.db("next-posts");
  const user = await db.collection("users").findOne({
    username: session.username,
    password: session.password,
  });

  if (!user) {
    throw new Error("user not found");
  }

  req.user = user;
  req.session = session;
};
