// import mongoose from "mongoose";
// const connection = {};

// async function connectDb() {
//   if (connection.isConnected) {
//     console.log("readay database");
//     return;
//   }

//   if (mongoose.connection.lentgh > 0) {
//     connection.isConnected = mongoose.connections[0].readyState;
//     if (connection.isConnected === 1) {
//       console.log("use previous connection to the database");
//       return;
//     }
//     await mongoose.disconnect();
//   }

//   const db = await mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   console.log("new connection to the database");
//   connection.isConnected = db.connections[0].readyState;
// }

// async function disconnectDb() {
//   if (connection.isConnected) {
//     if (process.env.NODE_END === "production") {
//       await mongoose.disconnect();
//       connection.isConnected = false;
//     } else {
//       console.log("not disconnected from the database");
//     }
//   }
// }

// const db = { connectDb, disconnectDb };
// export default db;

import mongoose from "mongoose";
const dbName = process.env.MONGODB_URI as string;

const connection: { isConnected: number | boolean | undefined } = {
  isConnected: undefined,
};

async function connectDb() {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(dbName);
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}

// function convertDocToObj(doc: LeanDocument<any>) {
//   doc._id = doc._id.toString();
//   doc.createdAt = doc.createdAt.toString();
//   doc.updatedAt = doc.updatedAt.toString();
//   return doc;
// }

const db = { connectDb, disconnectDb };
export default db;
