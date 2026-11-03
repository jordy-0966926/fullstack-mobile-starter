import { sql } from 'drizzle-orm'
import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const User = pgTable('user', {
	id: serial('id').notNull().primaryKey(),
	admin: boolean('admin').notNull(),
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	email: text('email').notNull().unique(),
	password: text('password'),
	dateCreated: timestamp('date_created', { precision: 3 }).defaultNow(),
	lastUpdated: timestamp('last_updated', { precision: 3 }).defaultNow(),
	uuid: text('uuid').notNull().unique().default(sql`uuid(4)`)
});