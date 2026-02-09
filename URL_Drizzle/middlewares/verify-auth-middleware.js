import { verifyJWTToken } from "../services/auth.services.js";

export const verifyAuthentication = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        req.user = null;
        return next();
    }
    try {
        const decodedToken = verifyJWTToken(token);
        req.user = decodedToken;
        console.log(`setting value for req.user in auth middleware :`, req.user);
    } catch (error) {
        console.log("Failing to set req.user value ",error);
        req.user = null;
    }
    return next();
}


//* Note You can add any property to req, but:

//* Avoid overwriting existing properties
//* Use req.user for authentication
//* Group custom properties under req.custom and make sure the data is lightweight