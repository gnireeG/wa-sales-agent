import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '#/components/ui/dialog'
import { Button } from '#/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Field, FieldGroup } from '#/components/ui/field'
import { Label } from '#/components/ui/label'
import { Input } from '#/components/ui/input'
import { useForm } from '@tanstack/react-form'
import { useAddChat } from '#/features/customer/customer.hooks'
import { useState } from 'react'


export default function NewChatDialog({ customer_id} : { customer_id: string}){

    const { mutateAsync } = useAddChat()
    const [open, setOpen] = useState(false)

    const form = useForm({
        defaultValues: {
            name: '',
            phone: '',
        },
        onSubmit: async ({value}) =>{
            await mutateAsync({...value, customer_id})
            form.reset()
            setOpen(false)
        }
    })
    return (
        <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger asChild>
                <Button size="sm" variant="ghost"><PlusCircle />New chat</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
            <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit()
            }}>
                <DialogHeader>
                <DialogTitle>Add a new chat</DialogTitle>
                <DialogDescription>
                    Add a new chat to the customer.
                </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <form.Field
                     name="name"
                     children={(field) => {
                        return(
                            <Field>
                                <Label htmlFor={field.name}>Name</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={() => field.handleBlur}
                                    />
                            </Field>
                        )
                     }}
                    />
                    <form.Field
                     name="phone"
                     children={(field) => {
                        return(
                            <Field>
                                <Label htmlFor={field.name}>Phone</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={() => field.handleBlur}
                                    />
                            </Field>
                        )
                     }}
                    />
                </FieldGroup>
                <DialogFooter className="mt-4">
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
            </DialogContent>
        </Dialog>
    )
}