import cookieParser from "cookie-parser";
import 'dotenv/config';
import express, { urlencoded } from "express";
import flash from "connect-flash";
import requestIp from "request-ip"
import session from "express-session";

import {shortenerRoutes} from "./routes/shorterner.Routes.js";
import { authRoute } from "./routes/auth.Routes.js";
import { verifyAuthentication } from "./middlewares/verify-auth-middleware.js";


const app = express();

const PORT = process.env.PORT||3002;

app.use(express.static("public"));
app.use(urlencoded({extended:true}));

app.set("view engine","ejs");
//? app.set("views","ejs"); //* If we need to define where the template folder will be custom

app.use(cookieParser());

//* First we set the cookie and then use the session
app.use(session({secret:"my-secret",resave:true, saveUninitialized:false}));
app.use(flash());

app.use(requestIp.mw()); //* Middleware for requesting client ip from anywhere
app.use(verifyAuthentication);
app.use((req, res, next) => {
  //? console.log("Here in app.js");
  res.locals.user = req.user || null;
  next();
});
//* How It Works:
//* This middleware runs on every request before reaching the route handlers.
//* res.locals is an object that persists throughout the request-response cycle.
//* If req.user exists (typically from authentication, like Passport.js), it's stored in res.locals.user.
//* Views (like EJS, Pug, or Handlebars) can directly access user without manually passing it in every route i.e., without(req. property).

app.use(authRoute);
app.use(shortenerRoutes);

app.listen(PORT,()=>{
  console.log(`Listening on http://localhost:${PORT}`);
})