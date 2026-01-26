import { db } from "../config/db.js";
import { shortLink } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export const loadLinks = async (id) => {
  const allshortLinks = await db.select().from(shortLink).where(eq(shortLink.userId,id));
  return allshortLinks;
};

export const getLinkByShortCode = async (shortCode) => {
  const [Link] = await db
    .select()
    .from(shortLink)
    .where({ shortCode: shortCode });
  return Link;
};

export const saveLinks = async ({ url, shortCode,id }) => {
  await db.insert(shortLink).values({ url: url, shortCode: shortCode,userId : id });
};
