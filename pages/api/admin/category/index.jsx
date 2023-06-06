
import { getSession } from 'next-auth/react';
import db from "@/utils/db";
import Category from "@/models/Category";



const handler = async (req, res) => {
  // const session = await getSession({ req });
  // if (!session || !session.user.isAdmin) {
  //   return res.status(401).send('admin signin required');
  // }
  // const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const getHandler = async (req, res) => {
  await db.connectDb();
  const category = await Category.find({});
  await db.disconnectDb();
  res.send(category);
};
export default handler;