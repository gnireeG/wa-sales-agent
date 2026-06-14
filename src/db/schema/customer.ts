import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const customer = pgTable("customer", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    state: text('state').default('lead').notNull(),
    notes: text('notes'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const chat = pgTable("chat", {
  id: uuid('id').primaryKey().defaultRandom(),
  customer_id: uuid('customer_id').notNull().references(() => customer.id, {onDelete: 'cascade'}),
  phone: text('phone'),
  name: text('name').notNull()
})


export const messageRoleEnum = pgEnum("message_role", ["user", "customer"]);
export const message = pgTable('message', {
  id: uuid('id').primaryKey().defaultRandom(),
  chat_id: uuid('chat_id').notNull().references(() => chat.id, {onDelete: 'cascade'}),
  role: messageRoleEnum().notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// RELATIONS

export const customerRelations = relations(customer, ({ many }) => ({
  chat: many(chat)
}))

export const chatRelations = relations(chat, ({ one, many }) => ({
  customer: one(customer, {
    fields: [chat.customer_id],
    references: [customer.id]
  }),
  message: many(message)
}))

export const messageRelations = relations(message, ({ one }) => ({
  chat: one(chat, {
    fields: [message.chat_id],
    references: [chat.id]
  })
}))