import { refreshTokens, verifyJWTToken } from "../services/auth.services.js";
import {
  ACCESS_TOKEN_EXPIRY,
  MILLISECONDS_PER_SECOND,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constant.js";
// export const verifyAuthentication = (req,res,next)=>{
//     const token = req.cookies.access_token;
//     if(!token){
//         req.user = null;
//         return next();
//     }
//     try {
//         const decodedToken = verifyJWTToken(token);
//         req.user = decodedToken;
//         console.log(`setting value for req.user in auth middleware :`, req.user);
//     } catch (error) {
//         console.log("Failing to set req.user value ",error);
//         req.user = null;
//     }
//     return next();
// }

export const verifyAuthentication = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  //* Initially the user will be null so that if user is not logged and we can move on
  //* If user is logged in, we will set it later
  req.user = null;

  //* User is logged out and hence no tokens hence it will proceed to login page
  if (!accessToken && !refreshToken) {
    return next();
  }

  //* User is logged-in hence decoding token and setting the req.user value
  if (accessToken) {
    const decodedToken = verifyJWTToken(accessToken);
    req.user = decodedToken;
    return next();
  }

  //* If only refresh token is available
  if (refreshToken) {
    try {
      const { newAccessToken, newRefreshToken, user } = await refreshTokens(refreshToken);

      req.user = user;
      const baseConfig = { httpOnly: true, secure: true };

      res.cookie("access_token", newAccessToken, {
        ...baseConfig,
        maxAge: ACCESS_TOKEN_EXPIRY,
      });

      res.cookie("refresh_token", newRefreshToken, {
        ...baseConfig,
        maxAge: REFRESH_TOKEN_EXPIRY,
      });

      return next();
    } catch (error) {
      console.log(error.message);
    }
  }
  return next();
};

//* Note You can add any property to req, but:

//* Avoid overwriting existing properties
//* Use req.user for authentication
//* Group custom properties under req.custom and make sure the data is lightweight
