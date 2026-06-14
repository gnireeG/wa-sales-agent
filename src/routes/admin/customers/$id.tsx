import NewChatDialog from '#/components/new-chat-dialog'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { Textarea } from '#/components/ui/textarea'
import { customerChatsQueryOptions, customerQueryOptions, useUpdateCustomer } from '#/features/customer/customer.hooks'
import type { CustomerState } from '#/features/customer/customer.schema'
import { useForm } from '@tanstack/react-form'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import Chat from '#/components/chat'
import { Phone } from 'lucide-react'

export const Route = createFileRoute('/admin/customers/$id')({
  loader: ({context: {queryClient}, params}) =>{
    return Promise.all(
      [
        queryClient.ensureQueryData(customerQueryOptions(params.id)),
        queryClient.ensureQueryData(customerChatsQueryOptions(params.id))
      ]
    )
  },
  component: RouteComponent,
  staticData: {
    breadcrumb: (match) => match.loaderData[0].name ?? 'Customer name'
  }
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data } = useSuspenseQuery(customerQueryOptions(id))
  const { data: chats } = useSuspenseQuery(customerChatsQueryOptions(id))

  // New message


  const { mutateAsync } = useUpdateCustomer()

  const form = useForm({
    defaultValues: {
      name: data?.name ?? '',
      notes: data?.notes ?? '',
      state: data?.state ?? 'lead' as CustomerState,
    },
    onSubmit: async ({value}) =>{
      mutateAsync({id, ...value, state: value.state as CustomerState})
    }
  })

  return (
    <>
      <div className="grid grid-cols-12 max-w-9xl gap-4 @xl:h-[calc(100vh-8rem)]">
        <Card className="col-span-12 @xl:col-span-6 @3xl:col-span-4">
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex flex-col gap-4"
            >
              <form.Field
              name="name"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={() => field.handleBlur()}
                    />
                  </Field>
                )
              }}
              />
              <form.Field
              name="notes"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Notes</FieldLabel>
                    <Textarea
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={() => field.handleBlur()}
                      rows={8}
                    />
                  </Field>
                )
              }}
              />
              <div className="flex justify-end">
                <Button type="submit">Update</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="col-span-12 @xl:col-span-6 @3xl:col-span-8 overflow-hidden">
            <CardContent className="h-full flex flex-col">
              <Tabs defaultValue={chats.length > 0 ? chats[0].id : ''} className="h-full flex flex-col">
                <div className="overflow-x-auto flex gap-1">
                  <TabsList>
                    {chats.map(chat =>
                      <TabsTrigger key={chat.id} value={chat.id}>{chat.name}</TabsTrigger>
                    )}
                  </TabsList>
                    <NewChatDialog customer_id={id} />
                </div>
                {chats.map(chat =>
                  <Chat chat={chat} key={chat.id} />
                )}
              </Tabs>
            </CardContent>
        </Card>
      </div>
    </>
  )
}
