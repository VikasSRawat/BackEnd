import crypto from 'crypto';
import { loadLinks, saveLinks, getLinkByShortCode } from '../services/shorterner.services.js';

export const postURLShorterner = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalshortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const links = await loadLinks();

    if (links[finalshortCode]) {
     return res.redirect(
        "/?error=shortcode_exists&message=Short code already exists"
      );
    }
    await saveLinks({url,shortCode});
    return res.redirect("/");
  } catch (error) {
    console.error("An error has occured here in postURLShortener controller ",error);
  }
};

export const getShortenerpage = async (req, res) => {
  try {
    //? const file = await readFile(path.join("views", "index.html"),"utf-8");
   const links = await loadLinks();
    // console.log(links);
      return res.render("index",{links,hosts : req.host})//* index.ejs will be rendered with links and req.host as partials
  } catch (error) {
    console.error("Error : ",error);
    return res.status(500).send("Internal Server Error");
  }
};

export const redirecttoShortLink = async (req,res)=>{
  try{
    const {shortCode} = req.params;
    //? const links = await loadLinks();
    const link = await getLinkByShortCode(shortCode);


    // if(!links[shortCode]) return res.status(404).send("404 Error has occured");
    if(!link) return res.status(400).send("404 Error has occured");

    return res.redirect(link.url);
  }
  catch(error){
    console.error("Error has occured ",error);
    return res.status(500).send("Internal Server Error");
  }
}

export const getHello = async(req,res)=>{
  return res.send("Hello")
}