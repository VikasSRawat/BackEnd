import { relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const shortLink = mysqlTable("short_link",{
    id: int().autoincrement().primaryKey(),
    url: varchar({length:255}).notNull(),
    shortCode: varchar({length:20}).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    userId : int().notNull().references(()=>usersTable.id) //* Defining foreign key
})


export const usersTable = mysqlTable("users",{
    id: int().autoincrement().primaryKey(),
    name: varchar({length:255}).notNull(),
    email: varchar({length:255}).notNull().unique(),
    password: varchar({length:255}).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
})


//! Defining what type of relations they have in the tables
//* A user can have many shortLinks hence the many we are using now
export const usersRelation = relations(usersTable,(params)=>({
    shortLink :params.many(shortLink)
}));

//* A shortLink can have only one particular user
export const shortLinkRelation = relations(shortLink,(params)=>({
    user : params.one(usersTable,{
        fields : [shortLink.userId], //* What is the foreign key
        references:[usersTable.id] //* which table it references to
    })
}))