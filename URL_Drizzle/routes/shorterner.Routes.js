//! Using express.router and just changing everything from app.get() or app.post to router.get() and router.post()

import express from "express";
import {postURLShorterner,getShortenerpage,redirecttoShortLink,getHello} from '../controllers/postshortenercontroller.js'

const router = express.Router();


router.get("/",getShortenerpage);

router.post("/",postURLShorterner);

router.get("/:shortCode",redirecttoShortLink);

router.get("/hello",getHello);

//* Best export used in real life projects will be named exports
//* Named Export
export const shortenerRoutes = router;