import crypto from "crypto";
import {
  loadLinks,
  saveLinks,
  getLinkByShortCode,
  findShortLinkById,
  deleteShortLinkById,
  getShortCode,
  updateshortLink
} from "../services/shorterner.services.js";
import z from 'zod';
import {shorternerSchema} from "../validators/shorterener-validator.js" 
export const postURLShorterner = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalshortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const links = await loadLinks();

    if (links[finalshortCode]) {
      req.flash(
        "Errors",
        "This shortcode already exists, please try with a new one",
      );
      return res.redirect("/");
    }
    await saveLinks({ url, shortCode, id: req.user.id });
    return res.redirect("/");
  } catch (error) {
    console.error(
      "An error has occured here in postURLShortener controller ",
      error,
    );
  }
};

export const getShortenerpage = async (req, res) => {
  try {
    if (!req.user) res.redirect("/login");
    const links = await loadLinks(req.user.id);
    return res.render("index", { links, host: req.host, errors: req.flash() }); //* index.ejs will be rendered with links and req.host as partials
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const redirecttoShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = await getLinkByShortCode(shortCode);
    if (!link) return res.status(404).send("404 Error has occured");
    return res.redirect(link.url);
  } catch (error) {
    console.error("Error has occured ", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getHello = async (req, res) => {
  return res.send("Hello");
};

export const getEditShorternerPage = async (req, res) => {
  const { data: id, error } = z.coerce.number().int().safeParse(req.params.id);
  if (error) return res.redirect("/404");
  try {
    const shortLink = await findShortLinkById(id);
    if (!shortLink) return res.redirect("404");

    return res.render("edit-shortlink", {
      id: shortLink.id,
      url: shortLink.url,
      shortCode: shortLink.shortCode,
      errors: req.flash("errors"),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const editShortLink = async(req,res)=>{
  const {data,error} = shorternerSchema.safeParse(req.body);
  if(error){
    const error_message = error.issues[0].message;
    req.flash("errors",error_message);
    return res.redirect("/");
  }
  // console.log(data);
  // console.log(req.params);

  const {url,shortCode} = data;
  const id = req.params.id;
  console.log(data);
  console.log(id);
  const shortCodeExists = getShortCode(shortCode);
  if(shortCodeExists){
    req.flash("errors","This shortCode already exists, Please enter a new unique one");
    return res.redirect("/");
  }
  await updateshortLink({url,shortCode,id});
}

export const deleteShortLink = async(req,res)=>{
  const { data: id, error } = z.coerce.number().int().safeParse(req.params.id);
  if (error) return res.redirect("/404");
  try {
    const shortLink = await findShortLinkById(id);
    if (!shortLink) return res.redirect("404");

   await deleteShortLinkById(id);
   return redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}