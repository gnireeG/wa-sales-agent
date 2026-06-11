import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

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