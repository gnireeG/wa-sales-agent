import { createServerFn } from "@tanstack/react-start";
import { addCustomerQuery, getCustomersQuery } from "./customer.queries";
import type { CreateCustomerInput, CustomerQueryOptions } from "./customer.schema";

export const getCustomers = createServerFn()
    .validator((data: CustomerQueryOptions) => data)
    .handler(async (data) => {
        return await getCustomersQuery(data.data)
    })

export const addCustomer = createServerFn()
    .validator((data: CreateCustomerInput) => data)
    .handler(async ({ data }) => {
        return await addCustomerQuery(data)
    })