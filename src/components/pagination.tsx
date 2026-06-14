import { Field, FieldLabel } from "#/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select";
import { cn } from "#/lib/utils";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination";

type PaginationProps = {
	page: number;
	setPage: (page: number) => void;
	perPage: number;
	setPerPage: (perPage: number) => void;
	total: number;
	totalPages: number;
	className?: string;
};
export default function PaginationComponent({
	page,
	setPage,
	perPage,
	setPerPage,
	total,
	totalPages,
	className,
}: PaginationProps) {
	const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

	const start = clamp(page - 1, 1, Math.max(1, totalPages - 2));
	const visiblePages = [start, start + 1, start + 2].filter((p) => p <= totalPages);
	const showStartEllipsis = visiblePages[0] > 1;
	const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

	return (
		<div className={cn("flex gap-4 flex-wrap items-center justify-center flex-col", className)}>
			<Pagination className="mx-0 w-auto">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious onClick={() => setPage(clamp(page - 1, 1, totalPages))} />
					</PaginationItem>

					{showStartEllipsis && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{visiblePages.map((pageNum) => (
						<PaginationItem key={pageNum}>
							<PaginationLink isActive={pageNum === page} onClick={() => setPage(pageNum)}>
								{pageNum}
							</PaginationLink>
						</PaginationItem>
					))}

					{showEndEllipsis && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					<PaginationItem>
						<PaginationNext onClick={() => setPage(clamp(page + 1, 1, totalPages))} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			<div className="flex gap-4 items-center flex-wrap justify-center">
				<FieldLabel className="whitespace-nowrap">
					{page * perPage - (perPage - 1)} - {Math.min(page * perPage, total)} of {total}
				</FieldLabel>
				<Field orientation="horizontal" className="w-fit">
					<Select
						defaultValue="25"
						value={perPage.toString()}
						onValueChange={(val) => {
							setPerPage(parseInt(val));
							setPage(1);
						}}
					>
						<SelectTrigger className="w-20" id="select-rows-per-page">
							<SelectValue />
						</SelectTrigger>
						<SelectContent align="start">
							<SelectGroup>
								<SelectItem value="5">5</SelectItem>
								<SelectItem value="10">10</SelectItem>
								<SelectItem value="20">20</SelectItem>
								<SelectItem value="50">50</SelectItem>
								<SelectItem value="100">100</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</Field>
			</div>
		</div>
	);
}
