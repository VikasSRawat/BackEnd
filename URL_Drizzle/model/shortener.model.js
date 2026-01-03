// import path from 'path';
// import {readFile, writeFile } from 'fs/promises';

// const DATA_FILE = path.join("data", "links.json");

// export const loadLinks = async () => {
//   try {
//     const data = await readFile(DATA_FILE, "utf-8");
//     return JSON.parse(data);
//   } catch (err) {
//     if (err.code === "ENOENT") {
//       await writeFile(DATA_FILE, JSON.stringify({}));
//       return {};
//     }
//     throw err;
//   }
// };

// export const saveLinks = async (links) => {
//   await writeFile(DATA_FILE, JSON.stringify(links));
// };

// import { dbClient } from "../config/db-client.js";
// import { env } from "../config/env.js";

// const db = dbClient.db(env.MONGODB_DATABASE_NAME);
// const shortenerCollection = db.collection("shorteners");

import { db } from "../config/db-client.js";

export const loadLinks = async () => {
  //? return shortenerCollection.find().toArray();
  const [rows] = await db.execute("select * from short_links");
  return rows;
};

export const saveLinks = async ({ url, shortCode }) => {
  // return shortenerCollection.insertOne(link)
  console.log("The URL in saveLinks is "+url);
  const [result] = await db.execute(
    `INSERT INTO short_links(short_code,url) values(?,?)`,
    [shortCode, url]
  );
  return result;
};

export const getLinkByShortCode = async (shortCode) => {
  // return await shortenerCollection.findOne({shortCode : shortCode});
  const [result] = await db.execute(
    `SELECT * FROM short_links WHERE short_code = ?`,
    [shortCode]
  );
  return result.length > 0 ? result[0] : null;
};
