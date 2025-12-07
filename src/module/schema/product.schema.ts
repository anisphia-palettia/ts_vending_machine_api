import z from "zod";

export const productCreateInputSchema = z.object({
  name: z.string().min(2).max(100),
  price: z.coerce.number().min(0).max(10000),
  quantity: z.coerce.number().min(0).max(1000),
  image: z.instanceof(File),
});

export type ProductCreateInput = z.infer<typeof productCreateInputSchema>;
