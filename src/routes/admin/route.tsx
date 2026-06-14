import { createFileRoute, Outlet, redirect, useMatches } from "@tanstack/react-router";
import { AppSidebar } from "#/components/layout/app-sidebar";
import { ModeToggle } from "#/components/mode-toggle";
import { ThemeProvider } from "#/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { Spinner } from "#/components/ui/spinner";
import Breadcrumbs from "#/components/breadcrumbs";

export const Route = createFileRoute("/admin")({
	beforeLoad: async ({ context }) => {
		if (!context.session) {
			throw redirect({ to: "/login" });
		}
	},
	component: Dashboard,
});

function Loading(){
	return(
		<div className="absolute top-1/2 left-1/2"><Spinner /></div>
	)
}

function Dashboard() {
	const { user } = Route.useRouteContext();
	const matches = useMatches()

	const crumbs = matches
		.filter((m) => m.staticData?.breadcrumb)
		.map((m) => ({
		path: m.pathname,
		label:
			typeof m.staticData.breadcrumb === 'function'
			? m.staticData.breadcrumb(m)
			: m.staticData.breadcrumb,
		}))

	return (
		<ThemeProvider defaultTheme="system" storageKey="theme">
			<SidebarProvider>
				<AppSidebar user={user} />
					<main className="relative w-full p-2 sm:p-4 md:p-6 @container">
						<div className="flex justify-between items-center mb-2 md:mb-4">
							<div className="flex gap-4 items-center">
								<SidebarTrigger />
								<Breadcrumbs breadcrumbs={crumbs} />
							</div>
							<ModeToggle />
						</div>
						<Suspense fallback={<Loading />}>
							<Outlet />
						</Suspense>
					</main>
			</SidebarProvider>
		</ThemeProvider>
	);
}
