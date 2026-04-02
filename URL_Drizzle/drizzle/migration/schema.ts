import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, int, varchar, timestamp, text, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const isEmailValid = mysqlTable("is_email_valid", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	token: varchar({ length: 8 }).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).default(sql`((now() + interval 1 day))`),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "is_email_valid_id"}),
]);

export const sessions = mysqlTable("sessions", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	valid: tinyint().default(1).notNull(),
	userAgent: text("user_agent"),
	ip: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "sessions_id"}),
]);

export const shortLink = mysqlTable("short_link", {
	id: int().autoincrement().notNull(),
	url: varchar({ length: 255 }).notNull(),
	shortCode: varchar({ length: 20 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow().notNull(),
	userId: int().notNull().references(() => users.id),
},
(table) => [
	primaryKey({ columns: [table.id], name: "short_link_id"}),
	unique("short_link_shortCode_unique").on(table.shortCode),
]);

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow().notNull(),
	isEmailValid: tinyint("is_email_valid").default(0).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
	unique("users_email_unique").on(table.email),
]);
