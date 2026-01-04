import { db } from "../config/db.js";
import { shortLink } from "../drizzle/schema.js";

export const loadLinks = async () => {
  const allshortLinks = await db.select().from(shortLink);
  return allshortLinks;
};

export const getLinkByShortCode = async (shortCode) => {
  const [Link] = await db
    .select()
    .from(shortLink)
    .where({ shortCode: shortCode });
  return Link;
};

export const saveLinks = async ({ url, shortCode }) => {
  await db.insert(shortLink).values({ url: url, shortCode: shortCode });
};
