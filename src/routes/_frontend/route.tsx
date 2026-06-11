import Navbar from '#/components/layout/frontend/navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_frontend')({
  component: RouteComponent,
})

function RouteComponent() {

  const { user } = Route.useRouteContext()

  return(
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  )
}
