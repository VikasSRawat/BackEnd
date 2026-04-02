import { relations } from "drizzle-orm/relations";
import { users, isEmailValid, sessions, shortLink } from "./schema";

export const isEmailValidRelations = relations(isEmailValid, ({one}) => ({
	user: one(users, {
		fields: [isEmailValid.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	isEmailValids: many(isEmailValid),
	sessions: many(sessions),
	shortLinks: many(shortLink),
}));

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));

export const shortLinkRelations = relations(shortLink, ({one}) => ({
	user: one(users, {
		fields: [shortLink.userId],
		references: [users.id]
	}),
}));