import { eq } from 'drizzle-orm';
import { usersTable } from '../drizzle/schema.js';
import { db } from './../config/db.js';

export const getUserByEmail = async({email})=>{
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email,email))
    return user;
}

export const createUser = async({name,email,password})=>{
    return await db.insert(usersTable).values({name,email,password}).$returningId();
}