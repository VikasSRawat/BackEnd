import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const shortLink = mysqlTable("short_link",{
    id: int().autoincrement().primaryKey(),
    url: varchar({length:255}).notNull(),
    shortCode: varchar({length:20}).notNull().unique()
})