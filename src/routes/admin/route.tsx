import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "#/components/layout/app-sidebar"
import { ThemeProvider } from '#/components/theme-provider'
import { ModeToggle } from '#/components/mode-toggle'

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ context }) => {
    if (!context.session) {
      throw redirect({ to: '/login' });
    }
  },
  component: Dashboard,
})

function Dashboard() {
  const { user } = Route.useRouteContext();
  
  return(
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <SidebarProvider>
        <AppSidebar user={user} />
        <main className="relative w-full p-2 sm:p-4 md:p-6">
          <SidebarTrigger />
          <div className="mt-4 md:mt-8">
            <Outlet />
          </div>
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}