import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export const loadLinks = async()=>{
    const allshortLinks = await Prisma.shortLink.findMany();
    return allshortLinks;
}

export const getLinkByShortCode = async (shortCode) => {
  const shortLink = await Prisma.shortLink.findUnique({
    where:{
        shortCode : shortCode
    }
  })

  return shortLink;
};

export const saveLinks = async ({ url, shortCode }) => {
    const newShortLink = await Prisma.shortLink.create({
        data:{shortCode,url} //* The order over here should match the table attributes order
    })
    return newShortLink;
};
