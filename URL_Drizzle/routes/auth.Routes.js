import { Router } from "express";
import { getLoginPage,getRegisterPage } from "../controllers/auth.Controller.js";

const router = Router();

router.get("/register",getRegisterPage);
router.get("/login",getLoginPage);

export const authRoute = router;

