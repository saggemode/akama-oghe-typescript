import { getSession } from "next-auth/react";
import Category from "@/models/Category";
import db from "@/utils/db";

const handler = async (req, res) => {
  // const session = await getSession({ req });
  // if (!session || (session && !session.user.isAdmin)) {
  //   return res.status(401).send("signin required");
  // }

  // const { user } = session;
  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "PUT") {
    return putHandler(req, res);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const getHandler = async (req, res) => {
  await db.connectDb();
  const category = await Category.findById(req.query.id);
  await db.disconnectDb();
  res.send(category);
};
const putHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.isAdmin = Boolean(req.body.isAdmin);
    await user.save();
    await db.disconnect();
    res.send({ message: "User Updated Successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "User Not Found" });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    await user.remove();
    await db.disconnect();
    res.send({ message: "User Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "User Not Found" });
  }
};
export default handler;