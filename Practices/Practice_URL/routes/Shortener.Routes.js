import express from "express";
import { redirectToShortlink, getShortenerpage,postURLShorterner } from "../Controllers/Shortener.Controller.js";

const router = express.Router();

router.post("/",postURLShorterner);

router.get("/",getShortenerpage);

router.get("/:shortCode",redirectToShortlink);

// router.post("/")


export const shortenerRoutes = router;