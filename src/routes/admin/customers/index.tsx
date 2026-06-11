import PaginationComponent from '#/components/pagination'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '#/components/ui/table'
import { useAddCustomer, useCustomers } from '#/features/contacts/customer.hooks'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/customers/')({
  component: RouteComponent,
})

function RouteComponent() {

  const [ page, setPage ] = useState(1)
  const [ perPage, setPerPage ] = useState(10)

  const {data, isLoading} = useCustomers({page, perPage})

  const { mutateAsync } = useAddCustomer()

  const form = useForm({
    defaultValues: {
      name: '',
      state: 'lead' as const,
      notes: null as string | null
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
    }
  })

  if(isLoading) return <p>Loading...</p>

  return(
    <div>
      <h1>I bi d customers site</h1>
      <form onSubmit={(e) =>{ e.preventDefault(); form.handleSubmit()}}>
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
            )
          }}
          />
          <Button type="submit">Create</Button>
      </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.data.map(customer => (
            <TableRow>
                <TableCell className="font-medium">{ customer.name }</TableCell>
                <TableCell>{ customer.state }</TableCell>
                <TableCell>{ customer.updatedAt.toLocaleDateString() }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      {data && (
        <PaginationComponent page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} total={data.meta.total} totalPages={data.meta.totalPages} />
      )}
    </div>
  )
}
