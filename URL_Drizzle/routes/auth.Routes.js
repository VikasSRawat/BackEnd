import { Router } from "express";
import {
  changePassowrd,
  editProfileName,
  getChangePasswordPage,
  geteEditProfilePage,
  getForgotPasswordPage,
  getLoginPage,
  getMe,
  getProfilePage,
  getRegisterPage,
  getVerifyEmailPage,
  logoutUser,
  postForgotPassword,
  postLogin,
  postRegister,
  resendVerificationLink,
  verifyEmailToken,
} from "../controllers/auth.Controller.js";

const router = Router();

// router.get("/register",getRegisterPage);

router.route("/register").get(getRegisterPage).post(postRegister);

//? router.get("/login",getLoginPage);
//* We can also chain the methods for the same route
router.route("/login").get(getLoginPage).post(postLogin);

router.route("/profile").get(getProfilePage);

router.route("/verify-email").get(getVerifyEmailPage);

router.route("/resend-verification-link").post(resendVerificationLink);

router.route("/verify-email-token").get(verifyEmailToken);

router.route("/me").get(getMe);

router.route("/logout").get(logoutUser);

router.route("/edit-profile").get(geteEditProfilePage).post(editProfileName);

router
  .route("/change-password")
  .get(getChangePasswordPage)
  .post(changePassowrd);

router
  .route("/reset-password")
  .get(getForgotPasswordPage)
  .post(postForgotPassword);

export const authRoute = router;
