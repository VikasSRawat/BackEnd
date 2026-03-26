import {
  ACCESS_TOKEN_EXPIRY,
  MILLISECONDS_PER_SECOND,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constant.js";
import { eq, and } from "drizzle-orm";
import { sessionsTable, usersTable } from "../drizzle/schema.js";
import { db } from "./../config/db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const getUserByEmail = async ({ email }) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return user;
};

export const hashPasswod = async (password) => {
  return await argon2.hash(password);
};

export const comparePassword = async (password, hash) => {
  return await argon2.verify(hash, password); //* HashedPassword first and then normal password
};

export const createUser = async ({ name, email, password }) => {
  return await db
    .insert(usersTable)
    .values({ name, email, password })
    .$returningId();
};

export const createSession = async (userId, { ip, userAgent }) => {
  const [session] = await db
    .insert(sessionsTable)
    .values({ userId, ip, userAgent })
    .$returningId(); //* Returns the ID of those rows which have been inserted
  return session;
};

export const createAccessToken = async ({ id, name, email, sessionId }) => {
  return jwt.sign({ id, name, email, sessionId }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND,
  });
};

export const createRefreshToken = async (sessionId) => {
  return jwt.sign({ sessionId }, process.env.JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND,
  });
};

export const verifyJWTToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const findSessionById = async (sessionId) => {
  //? console.log("Session ID is ",sessionId);
  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.id, sessionId));
  //? console.log("The session is ",session);
  return session;
};

export const findUserById = async (userId) => {
  console.log('User ID = ',userId)
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));
  return user;
};

export const refreshTokens = async (refreshToken) => {
  try {
    const decodedToken = verifyJWTToken(refreshToken);
    //? console.log(decodedToken);
    const currentSession = await findSessionById(decodedToken.sessionId);
    //? console.log(currentSession);

    if (!currentSession || !currentSession.valid) {
      throw new Error("Invalid session");
    }

    const user = await findUserById(currentSession.userId);
    console.log('User is ',user);

    if (!user) {
      throw new error("Invalid User");
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      sessionId: currentSession.id,
    };

    const newAccessToken = await createAccessToken(userInfo);
    const newRefreshToken = await createRefreshToken(currentSession.id);

  //? console.log("Getting new access and refresh token for the users",newAccessToken)
  //? console.log(newRefreshToken)
    return {newAccessToken,newRefreshToken,userInfo};

  } catch (error) {
    console.log(error.message);
  }
};

export const clearUserSession = async(sessionId)=>{
  return db.delete(sessionsTable).where(eq(sessionsTable.id,sessionId));
}



export const authenticateUser = async({req,res,user,name,email})=>{
  const session = await createSession(user.id, {
    ip: req.clientIp,
    userAgent: req.headers["user-agent"],
  });

  //?console.log(user);
  req.flash("success", "User Created Successfully");
    const accessToken = await createAccessToken({
    id: user.id,
    name: user.name||name,
    email: user.email||email,
    sessionId: session.id,
  });
  const refreshToken = await createRefreshToken({
    id: session.id,
  });


  const baseConfig = { httpOnly: true, secure: true};
  res.cookie("access_token", accessToken, {
    ...baseConfig,
    maxAge: ACCESS_TOKEN_EXPIRY,
  });

  res.cookie("refresh_token", refreshToken, {
    ...baseConfig,
    maxAge: REFRESH_TOKEN_EXPIRY,
  });
}