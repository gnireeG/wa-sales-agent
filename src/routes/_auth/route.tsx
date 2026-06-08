import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ThemeProvider } from '#/components/theme-provider'
import { ModeToggle } from '#/components/mode-toggle'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <ThemeProvider defaultTheme="system" storageKey="theme">
        <div className="min-h-svh w-full flex justify-center items-center relative" suppressHydrationWarning >
            <Outlet />
            <div className="absolute right-4 top-4">
                <ModeToggle />
            </div>
        </div>
    </ThemeProvider>
  )
}
