import { relations,sql } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar, boolean,text } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users",{
    id: int().autoincrement().primaryKey(),
    name: varchar({length:255}).notNull(),
    email: varchar({length:255}).notNull().unique(),
    password: varchar({length:255}).notNull(),
    isEmailValid: boolean("is_email_valid").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
})

export const verifyEmailTokenTable = mysqlTable("is_email_valid",{
    id: int().autoincrement().primaryKey(),
    userId: int("user_id").notNull().references(()=>usersTable.id, {onDelete:"cascade"}),
    token: varchar({length:8}).notNull(),
    expiresAt: timestamp("expires_at").default(sql`(CURRENT_TIMESTAMP + INTERVAL 1 DAY)`),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const shortLink = mysqlTable("short_link",{
    id: int().autoincrement().primaryKey(),
    url: varchar({length:255}).notNull(),
    shortCode: varchar({length:20}).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    userId : int().notNull().references(()=>usersTable.id) //* Defining foreign key
})

export const sessionsTable = mysqlTable("sessions",{
    id:int().autoincrement().primaryKey(),
    //* In the sessions table the attribute field will be named as user_id which is written in the parenthesis
    userId:int("user_id").notNull().references(()=>usersTable.id,{onDelete:"cascade"}), 
    valid:boolean().default(true).notNull(),
    userAgent:text("user_agent"),
    ip:varchar({length:255}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
})



//! Defining what type of relations they have in the tables
//* A user can have many shortLinks hence the many we are using now
export const usersRelation = relations(usersTable,(params)=>({
    shortLink :params.many(shortLink),
    session : params.many(sessionsTable),
}));

//* A shortLink can have only one particular user
export const shortLinkRelation = relations(shortLink,(params)=>({
    user : params.one(usersTable,{
        fields : [shortLink.userId], //* What is the foreign key
        references:[usersTable.id] //* which table it references to
    })

}))


export const sessionsRelation = relations(sessionsTable,(params)=>({
    user : params.one(usersTable,{
        fields : [sessionsTable.userId], //* What is the foreign key
        references:[usersTable.id] //* which table it references to
    })
}))