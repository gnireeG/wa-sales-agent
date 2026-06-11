import FormError from '#/components/form-error'
import { Button } from '#/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { authClient } from '#/lib/auth-client'
import { useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Spinner } from '#/components/ui/spinner'
import { Field } from '#/components/ui/field'
import { Checkbox } from '#/components/ui/checkbox'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {

  const [errorMsg, setErrorMsg] = useState('');

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email({
        email: value.email,
        password: value.password,
        rememberMe: value.rememberMe,
        callbackURL: '/admin'
      }, {
        onRequest: (ctx) => {
          setErrorMsg('')
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
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Link to="/register"><Button variant="link">Sign Up</Button></Link>
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
                    name="email"
                    validators={{
                      onBlur: z.email({ message: 'Ungültige E-Mail-Adresse' }),
                    }}
                    children={(field) => {
                      return (
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
                          />
                          <FormError field={field} />
                        </>
                      )
                    }}
                  />
                </div>
                <form.Field
                  name="password"
                  validators={{ 
                    onBlur: z.string()
                  }}
                  children={(field) =>{
                    return(
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor={field.name}>Password</Label>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input
                      type="password"
                      required
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete='none'
                      />
                      <FormError field={field} />
                    </div>
                    )
                  }}
                />
                <form.Field
                name="rememberMe"
                children={(field) => {
                  return (
                    <Field orientation="horizontal">
                      <Checkbox id="terms-checkbox" name="terms-checkbox" checked={field.state.value} onCheckedChange={(e) => field.handleChange(e === true)} />
                      <Label htmlFor="terms-checkbox">Keep me signed in</Label>
                    </Field>
                  )
                }}
                />
              </div>
              {errorMsg && errorMsg.length > 0 && (
                <p className="text-sm text-destructive mt-4 flex gap-2 items-center flex-wrap"><TriangleAlert size={12} />{ errorMsg }</p>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-8">
              <Button type="submit" className="w-full">
                Login
                { form.state.isSubmitting && <Spinner data-icon="inline-start" />}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </form>
    </Card>
  )
}
