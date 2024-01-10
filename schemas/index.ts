import * as z from "zod";

export const RegisterSchema = z
  .object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Your password should be at least 6 characters"),
    confirmPassword: z
      .string({ required_error: "Confirmation password is required" })
      .min(6, "Your password should be at least 6 characters"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Your passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const LoginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }),
});
