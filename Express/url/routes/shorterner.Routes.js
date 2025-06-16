//! Using express.router and just changing everything from app.get() or app.post to router.get() and router.post()

import express from "express";
import {postURLShorterner,getShortenerpage,getShortCode} from '../controllers/postshortenercontroller.js'

const router = express.Router();

//* Redefined it in the models page
//? const DATA_FILE = path.join("data", "links.json");

//? const loadLinks = async () => {
//?   try {
//?     const data = await readFile(DATA_FILE, "utf-8");
//?     return JSON.parse(data);
//?   } catch (err) {
//?     if (err.code === "ENOENT") {
//?       await writeFile(DATA_FILE, JSON.stringify({}));
//?       return {};
//?     }
//?     throw err;
//?   }
//? };

//? const saveLinks = async (links) => {
//?   await writeFile(DATA_FILE, JSON.stringify(links));
//? };


//! Small section for EJS Partials
//? const data = {
//?     name:'vikas',
//?     subject : 'English',
//?     marks: 99
//? };
//? router.get("/report",async(req,res)=>{
//     //? res.send("Hi")
//     //? res.render("report",{name : "Vikas Singh Rawat"}) //* Passing a single value
//?     res.render("report",{data}) //* Passing the object
//? })


router.get("/",getShortenerpage);
//? router.get("/", async (req, res) => {
//?   try {
//?     const file = await readFile(path.join("views", "index.html"),"utf-8");
//?     const links = await loadLinks();

//?     const content = file.toString().replaceAll(
//?       "{{shortened-urls}}",
//?       Object.entries(links).map(
//?         ([shortCode, url]) =>
//?           `<li><a href="/${shortCode}" target="_blank">${req.host}/${shortCode}</a></li>`
//?       )
//?       .join(" ")
//?     );
//?     return res.send(content);
//?   } catch (error) {
//?     console.error("Error : ",error);
//?     return res.status(500).send("Internal Server Error");
//?   }
//? });

//! Using Controller over here to make it modular and calling it to postURLShortener in the controller folder in a file
//* Here we are also passing the loadLinks and saveLinks file also

router.post("/",postURLShorterner);
//* Redifined the below code in the postURLShortener in the controllers
//? router.post("/", async (req, res) => {
//?   try {
//?     const { url, shortCode } = req.body;
//?     const finalshortCode = shortCode || crypto.randomBytes(4).toString("hex");

//?     const links = await loadLinks();

//?     if (links[finalshortCode]) {
//?       return res
//?         .status(400)
//?         .send("Short code already exists. Please choose a different one.");
//?     }
//?     links[finalshortCode] = url;
//?     await saveLinks(links);
//?     return res.redirect("/");
//?   } catch (error) {
//?     console.error("An error has occured here in app.post(/) ",error);
//?   }
//? });


//* Redefined the below code in the controller section

//? router.post("/:shortCode",async (req,res)=>{
//?   try{
//?     const {shortCode} = req.params;
//?     const links = await loadLinks();

//?     if(!links[shortCode]) return res.status(404).send("404 Error has occured");


//?     return res.redirect(links[shortCode]);
//?   }
//?   catch(error){
//?     console.error("Error has occured ",error);
//?     return res.status(500).send("Internal Server Error");
//?   }
//? })

router.get("/:shortCode",getShortCode);

// export default router;


//* Best export used in real life projects will be named exports
//* Named Export
export const shortenerRoutes = router;