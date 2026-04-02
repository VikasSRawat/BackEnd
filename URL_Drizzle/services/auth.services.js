import {
  ACCESS_TOKEN_EXPIRY,
  MILLISECONDS_PER_SECOND,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constant.js";
import { and, eq, gte, lt, sql } from "drizzle-orm";
import {
  sessionsTable,
  shortLink,
  shortLinkRelation,
  usersTable,
  verifyEmailTokenTable,
} from "../drizzle/schema.js";
import { db } from "./../config/db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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
  console.log("Session ID is ", sessionId);
  //* The sessionId recieved is either a number or an object
  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(
      eq(
        sessionsTable.id,
        typeof sessionId === "object" ? sessionId.id : sessionId,
      ),
    );
  return session;
};

export const findUserById = async (userId) => {
  console.log("findUserById in User ID = ", userId);
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));
  return user;
};

export const refreshTokens = async (refreshToken) => {
  try {
    const decodedToken = verifyJWTToken(refreshToken);
    console.log(decodedToken);
    const currentSession = await findSessionById(decodedToken.sessionId);
    //? console.log(currentSession);

    if (!currentSession || !currentSession.valid) {
      throw new Error("Invalid session");
    }

    const user = await findUserById(currentSession.userId);
    console.log("User is ", user);

    if (!user) {
      throw new error("Invalid User");
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      isEmailValid: user.isEmailValid,
      sessionId: currentSession.id,
    };

    const newAccessToken = await createAccessToken(userInfo);
    const newRefreshToken = await createRefreshToken(currentSession.id);

    //? console.log("Getting new access and refresh token for the users",newAccessToken)
    //? console.log(newRefreshToken)
    return { newAccessToken, newRefreshToken, userInfo };
  } catch (error) {
    console.log(error.message);
  }
};

export const clearUserSession = async (sessionId) => {
  return db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
};

export const authenticateUser = async ({ req, res, user, name, email }) => {
  const session = await createSession(user.id, {
    ip: req.clientIp,
    userAgent: req.headers["user-agent"],
  });

  //?console.log(user);
  req.flash("success", "User Created Successfully");
  const accessToken = await createAccessToken({
    id: user.id,
    name: user.name || name,
    email: user.email || email,
    isEmailValid: false,
    sessionId: session.id,
  });
  const refreshToken = await createRefreshToken({
    id: session.id,
  });

  const baseConfig = { httpOnly: true, secure: true };
  res.cookie("access_token", accessToken, {
    ...baseConfig,
    maxAge: ACCESS_TOKEN_EXPIRY,
  });

  res.cookie("refresh_token", refreshToken, {
    ...baseConfig,
    maxAge: REFRESH_TOKEN_EXPIRY,
  });
};

export const getAllShortLinks = async (Id) => {
  return await db.select().from(shortLink).where(eq(shortLink.userId, Id));
};

export const generateRandomToken = async (digit = 8) => {
  const min = 10 ** (digit - 1);
  const max = 10 ** digit;
  return crypto.randomInt(min, max).toString();
};

export const insertVerifyEmailToken = async (userId, token) => {
  console.log("TOKEN = ", token);
  await db.transaction(async (tx) => {
    try {
      await tx
        .delete(verifyEmailTokenTable)
        .where(lt(verifyEmailTokenTable.expiresAt, sql`CURRENT_TIMESTAMP`));

      await tx
        .delete(verifyEmailTokenTable)
        .where(eq(verifyEmailTokenTable.userId, userId));

      return await tx.insert(verifyEmailTokenTable).values({ userId, token });
    } catch (error) {
      console.log("Error : ", error.message);
    }
  });
};

export const createVerifyEmailLink = async ({ email, token }) => {
  const url = new URL(`http://${process.env.FRONTEND_URL}/verify-email-token`);
  url.searchParams.append("token", token);
  url.searchParams.append("email", email);
  return url.toString();
};

// export const findVerificationEmailToken = async ({ token, email }) => {
//   const tokenData = await db
//     .select({
//       userId: verifyEmailTokenTable.userId,
//       token: verifyEmailTokenTable.token,
//       expiresAt: verifyEmailTokenTable.expiresAt,
//     })
//     .from(verifyEmailTokenTable)
//     .where(
//       and(
//         eq(token, verifyEmailTokenTable.token),
//         gte(verifyEmailTokenTable.expiresAt, sql`CURRENT_TIMESTAMP`),
//       ),
//     );

//   if (!tokenData) return null;

//   const { userId } = tokenData[0];

//   const [userData] = await db
//     .select()
//     .from(usersTable)
//     .where(eq(usersTable.id, userId));

//   console.log(userData);
//   if (!userData) return null;

//   console.log(tokenData);

//   return {
//     userId: userData.id,
//     email: userData.email,
//     token: tokenData[0].token,
//     expiresAt: tokenData[0].expiresAt,
//   };
// };

export const findVerificationEmailToken = async ({ token, email }) => {
  return await db
    .select({
      userId: usersTable.id,
      email: usersTable.email,
      token: verifyEmailTokenTable.token,
      expiresAt: verifyEmailTokenTable.expiresAt,
    })
    .from(verifyEmailTokenTable)
    .where(
      and(
        eq(token, verifyEmailTokenTable.token),
        // eq(usersTable.email,email),
        gte(verifyEmailTokenTable.expiresAt, sql`CURRENT_TIMESTAMP`),
      )
    ).innerJoin(usersTable,eq(usersTable.id,verifyEmailTokenTable.userId));
};

export const verifyEmailAndUpdate = async (email) => {
  console.log("Email in verifyEmailUpdate = ",email);
  try {
    return await db
    .update(usersTable)
    .set({ isEmailValid: true })
    .where(eq(email, usersTable.email));
  } catch (error) {
    console.log("Error has occured ",error);
    // return res.redirect("/verify-email");
  }
};

export const clearVerifyEmailTokens = async (email) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(email, usersTable.email));

  return await db
    .delete(verifyEmailTokenTable)
    .where(eq(verifyEmailTokenTable.userId, user.id));

  // (await db.select().from(usersTable)).join()
};
