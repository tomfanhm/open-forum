"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { getPreferences, updatePreferences } from "@/lib/user"
import { errorToast } from "@/lib/utils"
import {
  PreferencesResponseSchema,
  updatePreferencesSchema,
  UpdatePreferencesSchema,
} from "@/lib/validations/user"
import { useAuthStore } from "@/hooks/use-auth-store"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"

import { LoadingSpinner } from "./ui/loading-spinner"

const Loading = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
  </div>
)

const ErrorAlert = () => (
  <Alert>
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      There was an error fetching your preferences. Please try again later.
    </AlertDescription>
  </Alert>
)

const PreferencesForm: React.FC = () => {
  const { auth } = useAuthStore()
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["preferences", auth!.email], // The auth value is not null here
    queryFn: async (): Promise<PreferencesResponseSchema> => {
      return await getPreferences()
    },
    retry: 3,
    refetchOnWindowFocus: false,
  })

  const updateMutation = useMutation({
    mutationFn: async (values: UpdatePreferencesSchema) => {
      return await updatePreferences(values)
    },
    onError: (error) => {
      errorToast(error)
    },
    onSuccess: (data) => {
      toast.success("Preferences updated.")
      queryClient.setQueryData(["preferences", auth!.email], data)
    },
  })

  if (isLoading) return <Loading />
  if (isError) return <ErrorAlert />
  if (!data) return <ErrorAlert />
  return (
    <PreferencesFormView
      defaultValues={data}
      onSubmit={(values) => updateMutation.mutate(values)}
      isSubmitting={updateMutation.isPending}
    />
  )
}

type PreferencesFormViewProps = {
  defaultValues: UpdatePreferencesSchema
  onSubmit: (values: UpdatePreferencesSchema) => void
  isSubmitting: boolean
}

const PreferencesFormView: React.FC<PreferencesFormViewProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
}) => {
  const form = useForm<UpdatePreferencesSchema>({
    defaultValues,
    resolver: zodResolver(updatePreferencesSchema),
  })

  const { setTheme } = useTheme()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 sm:space-y-12"
      >
        <div>
          <h2 className="text-foreground text-base font-semibold">
            Preferences
          </h2>
          <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
            Customize how the forum behaves for you
          </p>

          <div className="border-border sm:divide-border mt-10 space-y-8 border-b pb-12 sm:mt-6 sm:divide-y sm:border-t sm:pb-0">
            {/* Dark Mode */}
            <FormField
              control={form.control}
              name="dark_mode"
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
                  <FormLabel>Dark mode</FormLabel>
                  <div className="sm:col-span-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked: boolean) => {
                          field.onChange(checked)
                          setTheme(checked ? "dark" : "light")
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {/* Notification Emails */}
            <FormField
              control={form.control}
              name="notification_emails"
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
                  <FormLabel>Notification emails</FormLabel>
                  <div className="sm:col-span-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {/* Show Avatars */}
            <FormField
              control={form.control}
              name="show_avatars"
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
                  <FormLabel>Show avatars</FormLabel>
                  <div className="sm:col-span-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? <LoadingSpinner /> : "Confirm"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PreferencesForm
