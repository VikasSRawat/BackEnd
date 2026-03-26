import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constant.js";
import {
  //   generateToken,
  createSession,
  getUserByEmail,
  createUser,
  hashPasswod,
  comparePassword,
  createRefreshToken,
  createAccessToken,
  clearUserSession,
  authenticateUser,
} from "../services/auth.services.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validators/auth-validator.js";

export const getRegisterPage = (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("../views/auth/register", { errors: req.flash("errors") });
};

export const getLoginPage = (req, res) => {
  if (req.user) return res.redirect("/");

  //? console.log("getLoginPage hit")
  return res.render("../views/auth/login", { errors: req.flash("errors") }); //* This will also work
};

export const postLogin = async (req, res) => {
  if (req.user) return res.redirect("/");
  const { data, error } = loginUserSchema.safeParse(req.body);
  if (error) {
    const error_message = error.issues[0].message;
    req.flash("errors", error_message);
    return res.redirect("/login");
  }
  const { email, password } = data;
  const user = await getUserByEmail({ email });
  if (!user) {
    //? console.log("User does not exist");
    req.flash("errors", "Invalid Email or Password");
    return res.redirect("/login");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    //? console.log("Wrong password");
    req.flash("errors", "Invalid Email or Password");
    return res.redirect("/login");
  }

  //? console.log("Correct password");
  //? const token = generateToken({
  //?     id: user.id,
  //?     name : user.name,
  //?     email : user.email
  //? });

  //? console.log("token in auth.controller",typeof(token));
  // res.cookie("access_token",token,{path:"/"});

  //* Creating a session
  await authenticateUser({req,res,user});
  return res.redirect("/");
};

export const postRegister = async (req, res) => {
  if (req.user) return res.redirect("/");

  //? console.log(req.body);
  //? const {name,email,password} = req.body;
  const { data, error } = registerUserSchema.safeParse(req.body);
  if (error) {
    //? console.log(error);
    const error_message = error.issues[0].message;
    req.flash("errors", error_message);
    return res.redirect("/register");
  }
  console.log(data);

  const { name, email, password } = data;
  const userExists = await getUserByEmail({ email });
  console.log(userExists);
  if (userExists) {
    //? console.log("User Exists");
    //? console.log(userExists)
    //? return res.redirect("/");
    req.flash("errors", "User Already Exists");
    return res.redirect("/register");
  }
  const hashedPassword = await hashPasswod(password);
  const [user] = await createUser({ name, email, password: hashedPassword });

  await authenticateUser({req,res,user,name,email});
  return res.redirect("/");
};

export const getMe = (req, res) => {
  if (!req.user) return res.send("Not Logged In");
  return res.send(`<h1>Hey ${req.user.name} - ${req.user.email}</h1>`);
};

export const logoutUser = async(req, res) => {
  //* Also clearing the sessions from the database or else each login will create
  //* a new seperate session data entry quickly filling the database

  await clearUserSession(req.user.sessionId);
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.redirect("/login");
};
