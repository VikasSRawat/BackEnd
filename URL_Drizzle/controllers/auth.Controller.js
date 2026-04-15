import { safeParse } from "zod";
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constant.js";
import { sendEmail } from "../lib/nodemailer.js";
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
  findUserById,
  getAllShortLinks,
  insertVerifyEmailToken,
  createVerifyEmailLink,
  generateRandomToken,
  verifyEmailAndUpdate,
  clearVerifyEmailTokens,
  findVerificationEmailToken,
  sendNewVerifyEmailLink,
  udpateName,
  getPasswordById,
  updatePassword,
  findUserByEmail,
  createResetPasswordLink,
} from "../services/auth.services.js";
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  verifyEmailSchema,
  verifyPasswordSchema,
  verifyUserScehma,
} from "../validators/auth-validator.js";
import { getHtmlFromMjmlTemplate } from "../lib/get-HTML-template.js";

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
  //? res.cookie("access_token",token,{path:"/"});

  //* Creating a session
  await authenticateUser({ req, res, user });
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

  await authenticateUser({ req, res, user, name, email });
  await sendNewVerifyEmailLink({email,userId:user.id});
  return res.redirect("/verify-email");
};

export const getMe = (req, res) => {
  if (!req.user) return res.send("Not Logged In");
  return res.send(`<h1>Hey ${req.user.name} - ${req.user.email}</h1>`);
};

export const logoutUser = async (req, res) => {
  //* Also clearing the sessions from the database or else each login will create
  //* a new seperate session data entry quickly filling the database

  await clearUserSession(req.user.sessionId);
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.redirect("/login");
};

export const getProfilePage = async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const user = await findUserById(req.user.id);

  if (!user) return res.redirect("/login");

  const userShortLinks = await getAllShortLinks(user.id);
  return res.render("auth/profile", {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      isEmailValid: user.isEmailValid,
      links: userShortLinks,
    },
  });
};


export const getVerifyEmailPage = async(req,res)=>{
  if(!req.user || req.user.isEmailValid) return res.redirect("/");

  return res.render("../views/auth/verify-email.ejs",{
    email: req.user.email
  })
}

export const resendVerificationLink = async(req,res)=>{
  console.log("Resend Verification link function");
  if(!req.user)
      return res.redirect("/");
  
  const user = await findUserById(req.user.id);
  if(!user || user.isEmailValid)
      return res.redirect("/");
  
  await sendNewVerifyEmailLink({email: req.user.email,userId: req.user.id});

  res.redirect("/verify-email");
}

export const verifyEmailToken = async(req,res)=>{
  const {data,error} = verifyEmailSchema.safeParse(req.query);
  if(error){
    return res.send("Verification Link is Invalid or expired. Please enter a correct email link");
  }

  const token = await findVerificationEmailToken(data);
  if(!token) res.send("Verification Link is Invalid or expired. Please enter a correct email link");
  console.log('Token = ',token);
  await verifyEmailAndUpdate(token[0].email);

  clearVerifyEmailTokens(token[0].email).catch(console.error);
  return res.redirect("/profile");
}

export const geteEditProfilePage = async(req,res)=>{
  if(!req.user)
    return res.redirect("/login")
  const user = await findUserById(req.user.id);
  if(!user)
      return res.redirect("/login");
  
  return res.render("../views/auth/edit-profile", { errors: req.flash("errors") , user:user,username:user.name });
}

export const editProfileName = async(req,res)=>{
  const user = await findUserById(req.user.id);
  const { data, error } = verifyUserScehma.safeParse(req.body);
  if(error){
    console.log("Error messages are : ",error);
    req.flash("errors",error)
    return res.redirect("/edit-profile");
  }
  try {
    await udpateName({email: user.email,name : data.name})
  } catch (error) {
    console.log("Error updating the data ",error); 
  }
  // req.flash("error",[]); // Store the message in the session
return res.redirect("/profile");      // Redirect to the new page
}

export const getChangePasswordPage=async(req,res)=>{
  if(!req.user)
      return res.redirect("/login");
  return res.render("../views/auth/change-password",{errors:req.flash("errors")});
}

export const changePassowrd=async(req,res)=>{
  const {data,error} = verifyPasswordSchema.safeParse(req.body);
  
  if(error){
    const errorMessages = error.issues[0].message;
    req.flash("errors",errorMessages)
    return res.redirect("/change-password");
  }
  
  const {currentPassword,newPassword} = data;
  const userId = req.user.id;
  const oldPassword = await getPasswordById(userId);

  if(!oldPassword){
    req.flash("errors", "Invalid user");
    return res.redirect("/login");
  }
  const isPasswordValid = await comparePassword(currentPassword,oldPassword);
  if (!isPasswordValid) {
    req.flash("errors", "Invalid current Password");
    return res.redirect("/change-password");
  }

  const hashedPassword = await hashPasswod(newPassword);
  await updatePassword({password:hashedPassword,userId});
  req.flash("success","Password changed successfully");
  return res.redirect("/profile");
}

export const getForgotPasswordPage = async(req,res)=>{
  return res.render("../views/auth/forgot-password",{formSubmitted: req.flash("formSubmitted")[0],errors:req.flash("errors")});
}

export const postForgotPassword = async(req,res)=>{
  const {data,error} = forgotPasswordSchema.safeParse(req.body);
  if(error){
    console.log("Error ",error);
    const errorMessages = error.issues[0].message;
    req.flash("errors",errorMessages)
    return res.redirect("/reset-password");
  }
  
  const {email} = data;
  
  const user = await findUserByEmail(email);
  if(user){
    const resetPasswordLink = await createResetPasswordLink(user.id);
    // console.log(resetPasswordLink);
    const html = await getHtmlFromMjmlTemplate("reset-password-email",{
      name: user.name,
      link: resetPasswordLink
    })
    console.log(html);
  }
  return res.redirect("/login");
}