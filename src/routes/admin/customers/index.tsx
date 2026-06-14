import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import PaginationComponent from "#/components/pagination";
import SearchInput from "#/components/search-input";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#/components/ui/table";
import { useAddCustomer, useCustomers } from "#/features/customer/customer.hooks";

export const Route = createFileRoute("/admin/customers/")({
	component: RouteComponent
});

function RouteComponent() {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [search, setSearch] = useState("");

	const { data, isLoading } = useCustomers({ page, perPage, search });

	const { mutateAsync } = useAddCustomer();

	const form = useForm({
		defaultValues: {
			name: "",
			state: "lead" as const,
			notes: null as string | null,
			phone: "",
		},
		onSubmit: async ({ value }) => {
			await mutateAsync(value);
		},
	});

	if (isLoading) return <p>Loading...</p>;

	return (
		<div>
			<h1>I bi d customers site</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="mb-8"
			>
				<form.Field
					name="name"
					children={(field) => {
						return (
							<div>
								<Label htmlFor={field.name}>Name</Label>
								<Input
									type="text"
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</div>
						);
					}}
				/>
				<Button type="submit">Create</Button>
			</form>
			<div className="flex justify-end mb-4">
				<SearchInput onSearch={setSearch} />
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Updated</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.data.map((customer) => (
						<TableRow key={customer.id}>
							<TableCell className="font-medium">
								<Link to={`/admin/customers/$id`} params={{ id: customer.id }}>
									{customer.name}
								</Link>
							</TableCell>
							<TableCell>{customer.state}</TableCell>
							<TableCell>{customer.updatedAt.toLocaleDateString()}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{data && (
				<PaginationComponent
					className="mt-4"
					page={page}
					setPage={setPage}
					perPage={perPage}
					setPerPage={setPerPage}
					total={data.meta.total}
					totalPages={data.meta.totalPages}
				/>
			)}
		</div>
	);
}
