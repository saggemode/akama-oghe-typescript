// import db from './';

// const getError = (err) =>
//   err.response && err.response.data && err.response.data.message
//     ? err.response.data.message
//     : err.message;

// const onError = async (err, req, res, next) => {
//   await db.disconnect();
//   res.status(500).send({ message: err.toString() });
// };
// export { getError, onError };

import { NextApiRequest, NextApiResponse } from "next";
import db from './db';

const getError = (err: any) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;

const onError = async (err: any, req:NextApiRequest, res:NextApiResponse) => {
  await db.disconnectDb();
  res.status(500).send({ message: err.toString() });
};
export { getError, onError };