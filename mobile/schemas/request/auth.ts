import { z } from "zod";

import { email } from "../email";
import { password } from "../password";

export const loginRequest = z.object({
  email: email,
  password: password,
});

export type LoginRequest = z.infer<typeof loginRequest>;

export const registerRequest = z
  .object({
    email: email,
    password: password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export type RegisterRequest = z.infer<typeof registerRequest>;
