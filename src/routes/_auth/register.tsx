import FormError from '#/components/form-error'
import { Button } from '#/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Spinner } from '#/components/ui/spinner'
import { authClient } from '#/lib/auth-client'
import { useForm } from '@tanstack/react-form'
import { Link, useRouter } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
})

function RouteComponent() {

  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
        await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          callbackURL: '/admin'
        }, {
          onRequest: (ctx) =>{
            setErrorMsg('')
          },
          onSuccess: (ctx)=>{
            router.navigate({ to: "/admin" });
          },
          onError: (ctx) => {
            setErrorMsg(ctx.error.message)
          }
        })
    },
  })

  return (
    <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your details to create a new account.
          </CardDescription>
          <CardAction>
            <Link to="/login"><Button variant="link">Login</Button></Link>
          </CardAction>
        </CardHeader>
      <form onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <form.Field
                name="name"
                validators={{
                  onBlur: z.string().min(2, { message: 'Name muss mindestens 2 Zeichen haben' }),
                }}
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Max Mustermann"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="name"
                    />
                    <FormError field={field} />
                  </>
                )}
              />
            </div>
            <div className="grid gap-2">
              <form.Field
                name="email"
                validators={{
                  onBlur: z.email({ message: 'Ungültige E-Mail-Adresse' }),
                }}
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="m@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="email"
                    />
                    <FormError field={field} />
                  </>
                )}
              />
            </div>
            <div className="grid gap-2">
              <form.Field
                name="password"
                validators={{
                  onBlur: z.string().min(8, { message: 'Passwort muss mindestens 8 Zeichen haben' }),
                }}
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Passwort</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="new-password"
                    />
                    <FormError field={field} />
                  </>
                )}
              />
            </div>
            <div className="grid gap-2">
              <form.Field
                name="confirmPassword"
                validators={{
                  onBlurListenTo: ['password'],
                  onBlur: ({ value, fieldApi }) => {
                    if (value !== fieldApi.form.getFieldValue('password')) {
                      return 'Passwörter stimmen nicht überein'
                    }
                    return undefined
                  },
                }}
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Passwort bestätigen</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="new-password"
                    />
                    <FormError field={field} />
                  </>
                )}
              />
            </div>
          </div>
          {errorMsg && errorMsg.length > 0 && (
            <p className="text-sm text-destructive mt-4 flex gap-2 items-center flex-wrap"><TriangleAlert size={12} />{ errorMsg }</p>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-8">
          <Button type="submit" className="w-full">
            Register
            { form.state.isSubmitting && <Spinner data-icon="inline-start" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
