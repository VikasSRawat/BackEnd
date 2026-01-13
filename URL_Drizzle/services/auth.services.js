import { eq, and } from 'drizzle-orm';
import { usersTable } from '../drizzle/schema.js';
import { db } from './../config/db.js';
import  argon2  from 'argon2';

export const getUserByEmail = async({email})=>{
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email,email))
    return user;
}

export const hashPasswod = async(password)=>{
    return await argon2.hash(password);
}

export const comparePassword = async(password,hash)=>{
    return await argon2.verify(hash,password);//* HashedPassword first and then normal password
}

export const createUser = async({name,email,password})=>{
    return await db.insert(usersTable).values({name,email,password}).$returningId();
}