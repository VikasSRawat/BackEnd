import e from "express";
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

export const findShortLinkById = async(id)=>{
  const [result] = await db.select().from(shortLink).where(eq(shortLink.id,id));
  return result;
}

export const deleteShortLinkById = async(id)=>{
  await db.delete(shortLink).where(eq(shortLink.id,id));
}

export const getShortCode = async(shortCode) =>{
  const [result] = await db.select().from(shortLink).where(eq(shortLink.shortCode,shortCode));
  return result;
}

export const updateshortLink = async({url,shortCode,id})=>{
  console.log("Inside the updateShortLinkService");
  console.log(url,shortCode,id);
  await db.update(shortLink).set({url:url,shortCode:shortCode}).where(eq(shortLink.id,id));
}