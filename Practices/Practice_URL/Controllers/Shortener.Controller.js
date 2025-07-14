import crypto from "crypto";
import { Url } from "../models/URL.model.js";

// Show home page
export const getShortenerpage = async (req, res) => {
  return res.render("index", { shortUrl: null });
};

// Handle form submission and create short URL
export const postURLShorterner = async (req, res) => {
  const { url, shortCode } = req.body;

  try {
    // Step 1: Check if URL already exists
    const existing = await Url.findOne({ originalUrl: url });

    if (existing) {
      const fullShortUrl = `${req.protocol}://${req.get("host")}/${existing.shortCode}`;
      return res.render("index", { shortUrl: fullShortUrl });
    }

    // Step 2: Generate or use provided short code
    const finalshortCode = shortCode || crypto.randomBytes(4).toString("hex");

    // Step 3: Save to DB
    const newUrl = new Url({
      originalUrl: url,
      shortCode: finalshortCode,
    });

    await newUrl.save();
    console.log("✅ Saved to DB:", newUrl);

    const fullShortUrl = `${req.protocol}://${req.get("host")}/${finalshortCode}`;
    return res.render("index", { shortUrl: fullShortUrl });

  } catch (error) {
    console.error("❌ Error shortening URL:", error.message);
    return res.status(500).send("Server error");
  }
};

// Handle short code redirect
export const redirectToShortlink = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlData = await Url.findOne({ shortCode });

    if (urlData) {
      return res.redirect(urlData.originalUrl);
    } else {
      return res.status(404).send("Short URL not found.");
    }
  } catch (error) {
    console.error("❌ Redirect error:", error.message);
    return res.status(500).send("Server error");
  }
};
