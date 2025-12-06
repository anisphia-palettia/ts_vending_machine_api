import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(2).max(100),
  password: z.string(),
});

export type LoginInputSchema = z.infer<typeof loginSchema>;
