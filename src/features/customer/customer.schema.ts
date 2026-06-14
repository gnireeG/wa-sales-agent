import { z } from "zod";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const CustomerState = z.enum([
  "lead",
  "contacted",
  "in_talk",
  "won",
  "lost",
]);

export type CustomerState = z.infer<typeof CustomerState>;

// ─── Base ─────────────────────────────────────────────────────────────────────

export const customerSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Name is required").max(100),
  state: CustomerState,
  notes: z.string().max(2000).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Customer = z.infer<typeof customerSchema>;

// ─── Input Schemas (für Server Functions / Formulare) ─────────────────────────

export const createCustomerSchema = customerSchema.pick({
  name: true,
  state: true,
  notes: true,
});

export const updateCustomerSchema = createCustomerSchema.partial().extend({
  id: z.uuid()
});

export const customerIdSchema = z.object({
  id: z.uuid("Ungültige Kunden-ID"),
});

// Typen für die UI / serverFn-Aufrufe
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;

export type CustomerQueryOptions = {
  page?: number;
  perPage?: number;
  search?: string;
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export const chatSchema = z.object({
  id: z.uuid(),
  customer_id: z.uuid(),
  phone: z.string().nullable(),
  name: z.string().min(1, "Name is required")
});

export type Chat = z.infer<typeof chatSchema>;

export const createChatSchema = chatSchema.pick({
  customer_id: true,
  phone: true,
  name: true,
});

export const updateChatSchema = createChatSchema.partial().extend({
  id: z.uuid(),
});

export type CreateChatInput = z.infer<typeof createChatSchema>;
export type UpdateChatInput = z.infer<typeof updateChatSchema>;

// ─── Message ──────────────────────────────────────────────────────────────────

export const MessageRole = z.enum(["user", "customer"]);
export type MessageRole = z.infer<typeof MessageRole>;

export const messageSchema = z.object({
  id: z.uuid(),
  chat_id: z.uuid(),
  role: MessageRole,
  content: z.string().min(1),
  createdAt: z.date(),
});

export type Message = z.infer<typeof messageSchema>;

export const createMessageSchema = messageSchema.pick({
  chat_id: true,
  role: true,
  content: true,
}).extend({customer_id: z.uuid()});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;