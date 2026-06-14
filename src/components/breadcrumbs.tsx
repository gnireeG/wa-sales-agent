import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@tanstack/react-router";
import React from "react";

type BreadcrumbProps = {
	path: string;
	label: string | undefined;
}[];

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbProps }) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
                <BreadcrumbItem>
                    <Link to="/admin">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
				{breadcrumbs.map((crumb, index) => {
					const isLast = index === breadcrumbs.length - 1;
					return (
						<React.Fragment key={crumb.path}>
							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage>{crumb.label}</BreadcrumbPage>
								) : (
									<Link to={crumb.path}>{crumb.label}</Link>
								)}
							</BreadcrumbItem>
							{!isLast && <BreadcrumbSeparator />}
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
