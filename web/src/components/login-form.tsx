"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { login } from "@/lib/auth"
import { loginSchema, LoginSchema } from "@/lib/validations/auth"
import useAuthStore from "@/hooks/use-auth-store"

import GoogleLogin from "./google-login"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { LoadingSpinner } from "./ui/loading-spinner"

const LoginForm: React.FC = () => {
  const router = useRouter()

  const { setAuth } = useAuthStore()

  const form = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(values: LoginSchema) {
    const authResponse = await login(values)
    if (authResponse) {
      setAuth(authResponse)
      router.push("/")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="border-none shadow-none sm:border sm:shadow">
          <CardContent>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? <LoadingSpinner /> : "Login"}
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-6">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <GoogleLogin />
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
export default LoginForm
