import { z } from "zod";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const CustomerState = z.enum([
  "lead",
  "first_contact",
  "qualified",
  "proposal_sent",
  "negotiation",
  "won",
  "lost",
]);

export type CustomerState = z.infer<typeof CustomerState>;

// ─── Base ─────────────────────────────────────────────────────────────────────

export const customerSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Name ist erforderlich").max(100),
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

export const updateCustomerSchema = createCustomerSchema.partial();

export const customerIdSchema = z.object({
  id: z.string().uuid("Ungültige Kunden-ID"),
});

// Typen für die UI / serverFn-Aufrufe
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;

export type CustomerQueryOptions = {
  page?: number;
  perPage?: number;
}