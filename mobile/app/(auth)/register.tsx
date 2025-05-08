import { ActivityIndicator, View } from "react-native";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { Muted, Small } from "~/components/ui/typography";
import { RegisterRequest, registerRequest } from "~/schemas/request/auth";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

export default function Register() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerRequest),
  });

  const onSubmit = async (data: RegisterRequest) => {
    console.log(data);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Card className="w-full max-w-sm">
        {/* Card Header */}
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>

        {/* Card Content */}
        <CardContent>
          <View className="flex-col gap-4">
            {/* Email Field */}
            <View className="flex-col gap-2">
              <Label>Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email"
                  />
                )}
              />
              {errors.email && (
                <Small className="text-destructive">
                  {errors.email.message}
                </Small>
              )}
            </View>
            {/* Password Field */}
            <View className="flex-col gap-2">
              <Label>Password</Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your password"
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Small className="text-destructive">
                  {errors.password.message}
                </Small>
              )}
            </View>
            {/* Confirm Password Field */}
            <View className="flex-col gap-2">
              <Label>Confirm Password</Label>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Re-enter your password"
                    secureTextEntry
                  />
                )}
              />
              {errors.confirmPassword && (
                <Small className="text-destructive">
                  {errors.confirmPassword.message}
                </Small>
              )}
            </View>
          </View>
        </CardContent>
        {/* Card Footer */}
        <CardFooter className="flex-col gap-4">
          {/* Register Button */}
          <Button
            className="w-full"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator /> : <Text>Register</Text>}
          </Button>
          {/* Divider */}
          <View className="flex-row items-center">
            <View className="flex-1 h-px bg-muted-foreground" />
            <Muted className="mx-2">Or continue with</Muted>
            <View className="flex-1 h-px bg-muted-foreground" />
          </View>
          {/* OAuth Buttons */}
          <View className="flex-row items-center gap-4">
            <Button className="flex-1 h-10">
              <Text>Google</Text>
            </Button>
            <Button className="flex-1 h-10">
              <Text>Facebook</Text>
            </Button>
          </View>
          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Muted>Already have an account?</Muted>
            <Button
              variant="link"
              size="sm"
              className="ml-1"
              onPress={() => router.push("/login")}
            >
              <Small>Login</Small>
            </Button>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}
