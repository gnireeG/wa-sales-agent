import { createServerFn } from "@tanstack/react-start";
import { addChatForCustomerQuery, addCustomerQuery, addMessageQuery, getChatsForCustomerQuery, getCustomerByIdQuery, getCustomersQuery, updateCustomerQuery } from "./customer.queries";
import type { CreateChatInput, CreateCustomerInput, CreateMessageInput, CustomerQueryOptions, UpdateCustomerInput } from "./customer.schema";

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

export const updateCustomer = createServerFn()
    .validator((data: UpdateCustomerInput) => data)
    .handler(async ({data}) => {
        return await updateCustomerQuery(data)
    })

export const getCustomerById = createServerFn()
    .validator((data: { id: string }) => data)
    .handler(async (data) => {
        return await getCustomerByIdQuery(data.data.id)
    })

export const getChatsForCustomer = createServerFn()
    .validator((data: { customerId: string}) => data)
    .handler(async (data) => {
        return await getChatsForCustomerQuery(data.data.customerId)
    })

export const addChatToCustomer = createServerFn()
    .validator( (data: CreateChatInput) => data)
    .handler(async (data) => {
        return await addChatForCustomerQuery(data.data)
    })

export const addMessage = createServerFn()
    .validator( (data: CreateMessageInput) => data)
    .handler(async (data) => {
        return await addMessageQuery(data.data)
    })