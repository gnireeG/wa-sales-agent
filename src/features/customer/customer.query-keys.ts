import type { CustomerQueryOptions } from "./customer.schema";

export const customerKeys = {
  all: () => ['customers'] as const,
  lists: () => ['customers', 'list'] as const,
  list: (options?: CustomerQueryOptions) => ['customers', 'list', options] as const,
  id: (id: string) => ['customers', id] as const,
  chats: (customerId: string) => ['chats', customerId] as const
}