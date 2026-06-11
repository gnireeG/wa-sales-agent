import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addCustomer, getCustomers } from "./customer.service"
import type { CreateCustomerInput, CustomerQueryOptions } from "./customer.schema"

export const useCustomers = (options: CustomerQueryOptions = {}) => {
    return useQuery({
        queryKey: ['customers', options],
        queryFn: () => getCustomers({ data: options }),
        placeholderData: keepPreviousData
    })
}

export const useAddCustomer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (customer: CreateCustomerInput) => addCustomer({ data: customer }),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        }
    })
}