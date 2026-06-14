import {
	keepPreviousData,
	type MutationMeta,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { customerKeys } from "./customer.query-keys";
import type {
	CreateChatInput,
	CreateCustomerInput,
	CreateMessageInput,
	CustomerQueryOptions,
	UpdateCustomerInput,
} from "./customer.schema";
import {
	addChatToCustomer,
	addCustomer,
	addMessage,
	getChatsForCustomer,
	getCustomerById,
	getCustomers,
	updateCustomer,
} from "./customer.service";

export const useCustomers = (options: CustomerQueryOptions = {}) => {
	return useQuery({
		queryKey: customerKeys.list(options),
		queryFn: () => getCustomers({ data: options }),
		placeholderData: keepPreviousData,
	});
};

export const useAddCustomer = () => {
	return useMutation({
		mutationFn: (customer: CreateCustomerInput) =>
			addCustomer({ data: customer }),
		meta: {
			successMessage: "Customer added",
			errorMessage: "Error adding customer",
			invalidates: customerKeys.lists(),
		},
	});
};


export function customerQueryOptions(id: string){
	return queryOptions({
		queryKey: customerKeys.id(id),
		queryFn: () => getCustomerById({ data: { id }})
	})
}

export const useCustomer = (id: string) => {
	return useQuery(customerQueryOptions(id));
};

export function customerChatsQueryOptions(customerId: string){
	return queryOptions({
		queryKey: customerKeys.chats(customerId),
		queryFn: () => getChatsForCustomer({data: { customerId }})
	})
}

export const useCustomerChats = (customerId: string) => {
	return useQuery(customerChatsQueryOptions(customerId))
}

export const useAddChat = () => {
	const qC = useQueryClient();
	return useMutation({
		mutationFn: (chat: CreateChatInput) =>{
			return addChatToCustomer({data: chat})
		},
		onSuccess: (_data, variables) => {
			qC.invalidateQueries({queryKey: customerKeys.chats(variables.customer_id)})
		},
		meta: {
			successMessage: "Chat added",
			errorMessage: "Error adding chat",
		} satisfies MutationMeta,
	});
};

export const useUpdateCustomer = () => {
	const qC = useQueryClient();
	return useMutation({
		mutationFn: (data: UpdateCustomerInput) => updateCustomer({ data }),
		onSuccess: (_data, variables) => {
			qC.invalidateQueries({ queryKey: customerKeys.id(variables.id) });
			qC.invalidateQueries({ queryKey: customerKeys.lists() });
		},
		meta: {
			successMessage: "Customer updated",
			errorMessage: "Error updating customer",
		} satisfies MutationMeta,
	});
};

export const useAddMessage = () =>{
	const qC = useQueryClient();
	return useMutation({
		mutationFn: (data: CreateMessageInput) => addMessage({data}),
		onSuccess: (_data, variables) => {
			qC.invalidateQueries({queryKey: customerKeys.chats(variables.customer_id)})
		},
		meta: {
			errorMessage: "Error adding chat",
		} satisfies MutationMeta,
	})
}