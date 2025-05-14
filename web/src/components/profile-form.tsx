"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { getProfile, updateProfile } from "@/lib/user"
import {
  ProfileResponseSchema,
  updateProfileSchema,
  UpdateProfileSchema,
} from "@/lib/validations/user"

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Button } from "./ui/button"
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
import { Skeleton } from "./ui/skeleton"
import { Textarea } from "./ui/textarea"

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
      There was an error fetching your profile. Please try again later.
    </AlertDescription>
  </Alert>
)

const ProfileForm: React.FC = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<ProfileResponseSchema> => {
      return await getProfile()
    },
    retry: 3,
    refetchOnWindowFocus: false,
  })

  const updateMutation = useMutation({
    mutationFn: async (values: UpdateProfileSchema) => {
      return await updateProfile(values)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data)
    },
  })

  if (isLoading) return <Loading />
  if (isError) return <ErrorAlert />
  if (!data) return <ErrorAlert />

  return (
    <ProfileFormView
      defaultValues={data}
      onSubmit={(values: UpdateProfileSchema) => updateMutation.mutate(values)}
      isSubmitting={updateMutation.isPending}
    />
  )
}

interface ProfileFormViewProps {
  defaultValues: UpdateProfileSchema
  onSubmit: (values: UpdateProfileSchema) => void
  isSubmitting: boolean
}

const ProfileFormView: React.FC<ProfileFormViewProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
}) => {
  const form = useForm<UpdateProfileSchema>({
    defaultValues: defaultValues,
    resolver: zodResolver(updateProfileSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Inputs */}
        <div>
          <h2 className="text-foreground text-base font-semibold">
            Personal Details
          </h2>
          <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
            Tell us about yourself
          </p>
          <div className="border-border sm:divide-border mt-10 space-y-8 border-b pb-12 sm:space-y-0 sm:divide-y sm:border-t sm:pb-0">
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel>Display Name</FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Display Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar_url"
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel>Avatar URL</FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="https://example.com/avatar.png"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel>Bio</FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Tell us about yourself"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel>Location</FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="City, Country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel>Website</FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="https://example.com"
                        {...field}
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
        <div className="mt-6 flex justify-end">
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

export default ProfileForm
