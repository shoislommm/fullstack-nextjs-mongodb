import getUserFromSession from "@/middlewares/getUserFromSession";

export default async function handler(req, res) {
  await getUserFromSession(req, res)

  const session = req.session

  res.status(200).json({ session })
}