import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getSession } from '@/lib/auth.functions'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "#/components/layout/app-sidebar"
import { ThemeProvider } from '#/components/theme-provider'
import { ModeToggle } from '#/components/mode-toggle'

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    const session = await getSession();

    if (!session) {
      throw redirect({ to: "/login" });
    }

    return { user: session.user };
  },
  component: Dashboard,
})

function Dashboard() {
  const { user } = Route.useRouteContext();
  
  return(
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <SidebarProvider>
        <AppSidebar user={user} />
        <main className="relative w-full">
          <SidebarTrigger />
          <Outlet />
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}