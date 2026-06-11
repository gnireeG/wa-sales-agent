import { count } from "drizzle-orm";
import { db } from "#/db/index";
import { customer } from "#/db/schema";
import type { CreateCustomerInput, CustomerQueryOptions } from "./customer.schema";

export async function getCustomersQuery(options: CustomerQueryOptions) {
    const page = options.page ?? 1
    const perPage = options.perPage ?? 25
    const offset = (page - 1) * perPage

    const [rows, [{ total }]] = await Promise.all([
        db.select().from(customer).limit(perPage).offset(offset),
        db.select({ total: count() }).from(customer),
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
    console.log('helo from the query')
    return await db.insert(customer).values(data).returning()
}