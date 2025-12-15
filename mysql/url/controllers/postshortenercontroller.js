import crypto from 'crypto';
import { loadLinks,saveLinks,getLinkByShortCode } from '../model/shortener.model.js';

export const postURLShorterner = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    console.log(url);
    // console.log(shortCode);
    const finalshortCode = shortCode || crypto.randomBytes(4).toString("hex");
    // console.log(finalshortCode)
    const links = await loadLinks();

    if (links[finalshortCode]) {
      return res
        .status(400)
        .send("Short code already exists. Please choose a different one.");
    }
    // links[finalshortCode] = url;
    // await saveLinks(links);

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
    console.log(links);
    //* Replacing the below code with EJS partials
      //?  const content  = file.toString().replaceAll(
      //? "{{shortened-urls}}",
      //? Object.entries(links)
      //? .map(([shortCode, url]) =>{
      //?     url = url.length >= 30?`${url.slice(0,30)}...` : url,  
      //?      `<li><a href="/${shortCode}" target="_blank">${req.host}/${shortCode}</a></li>`
      //? }
      //? )
      //? .join(" ")  return res.send(content);
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