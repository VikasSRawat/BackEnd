import { Router } from "express";
import { getLoginPage,getRegisterPage,postLogin } from "../controllers/auth.Controller.js";

const router = Router();

router.get("/register",getRegisterPage);

//? router.get("/login",getLoginPage);
//* We can also chain the methods for the same route
router.route("/login").get(getLoginPage).post(postLogin)


export const authRoute = router;

