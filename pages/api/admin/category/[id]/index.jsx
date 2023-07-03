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
  const category = await Category.findById(req.query.id);
  if (category) {
    category.name = req.body.name;
    user.isAdmin = Boolean(req.body.isAdmin);
    await category.save();
    await db.disconnect();
    res.send({ message: "category Updated Successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "category Not Found" });
  }
};

const deleteHandler = async (req, res) => {
  await db.connectDb();
  const category = await Category.findById(req.query.id);
  if (category) {
    await category.deleteOne();
    await db.disconnectDb();
    res.send({ message: "category Deleted" });
  } else {
    await db.disconnectDb();
    res.status(404).send({ message: "category Not Found" });
  }
};
export default handler;
