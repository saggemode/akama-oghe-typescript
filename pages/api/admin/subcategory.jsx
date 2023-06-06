import db from "@/utils/db";
import SubCategory from "@/models/SubCategory";
import slugify from "slugify";

// import use(auth) middleware...

const handler = async (req, res) => {
  // const session = await getSession({ req });
  // if (!session || !session.user.isAdmin) {
  //   return res.status(401).send("admin signin required");
  // }
  // const { user } = session;
  if (req.method === "GET") {
    return getHandler(req, res);
  }
  if (req.method === "POST") {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const getHandler = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.json([]);
    }
    db.connectDb();
    const results = await SubCategory.find({ parent: category }).select("name");
    db.disconnectDb();
    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const postHandler = async (req, res) => {
  try {
    const { name, parent } = req.body;
    db.connectDb();
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "SubCategory already exist, Try a different name." });
    }

    await new SubCategory({ name, parent, slug: slugify(name) }).save();

    db.disconnectDb();
    res.json({
      message: `SubCategory ${name} has been created successfully.`,
      subCategory: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
};

export default handler;
