import { db } from "../config/db.js";
import { shortLink } from "../drizzle/schema.js";

export const loadLinks = async()=>{
    const allshortLinks = await db.select().from(shortLink);
    return allshortLinks;
}

export const getLinkByShortCode = async (shortCode) => {
  
};

export const saveLinks = async ({ url, shortCode }) => {
  
}
