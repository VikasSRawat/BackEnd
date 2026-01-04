import { Router } from "express";
import { getLoginPage,getRegisterPage } from "../controllers/auth.Controller.js";

const router = Router();

// router.get("/register",getRegisterPage);
router.get("/register", (req, res) => {
  console.log("ROUTE HIT");
  res.send("It works");
});
router.get("/login",getLoginPage);

export const authRoute = router;

