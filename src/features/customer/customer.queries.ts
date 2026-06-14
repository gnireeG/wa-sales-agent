import { count, eq, ilike } from "drizzle-orm";
import { db } from "#/db/index";
import { chat, customer, message } from "#/db/schema";
import type { CreateChatInput, CreateCustomerInput, CreateMessageInput, CustomerQueryOptions, UpdateCustomerInput } from "./customer.schema";

export async function getCustomersQuery(options: CustomerQueryOptions) {
    const page = options.page ?? 1
    const perPage = options.perPage ?? 25
    const search = options.search ?? ''
    const offset = (page - 1) * perPage

    const [rows, [{ total }]] = await Promise.all([
        db.select().from(customer).where(ilike(customer.name, `%${search}%`)).limit(perPage).offset(offset).orderBy(customer.createdAt),
        db.select({ total: count() }).from(customer).where(ilike(customer.name, `%${search}%`)),
    ])

    return {
        data: rows,
        meta: {
            total,
            page,
            perPage,
            totalPages: Math.ceil(total / perPage),
        },
    }
}

export async function addCustomerQuery(data: CreateCustomerInput){
    return await db.insert(customer).values(data).returning()
}

export async function updateCustomerQuery({ id, ...data }: UpdateCustomerInput) {
  return await db.update(customer).set(data).where(eq(customer.id, id)).returning()
}

export async function getCustomerByIdQuery(id: string){
    return await db.select().from(customer).where(eq(customer.id, id)).then(rows => rows[0])
}

export async function getChatsForCustomerQuery(customerId: string){
    return await db.query.chat.findMany({
        where: eq(chat.customer_id, customerId),
        with: { message: true }
    })
}

export async function addChatForCustomerQuery(data: CreateChatInput){
    return await db.insert(chat).values(data).returning()
}

export async function addMessageQuery(data: CreateMessageInput){
    return await db.insert(message).values(data).returning()
}