import { isNamedExportBindings } from "typescript";
import z from "zod";
import { id } from "zod/v4/locales";

export const productCreateInputSchema = z.object({
  name: z.string().min(2).max(100),
  price: z.coerce.number().min(0).max(10000),
  quantity: z.coerce.number().min(0).max(1000),
  image: z.instanceof(File),
});

export const productUpdateInputSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  price: z.coerce.number().min(0).max(10000).optional(),
  quantity: z.coerce.number().min(0).max(1000).optional(),
  image: z.instanceof(File).optional(),
});

export const productIdParamSchema = z.object({
  id: z.coerce.number().min(1),
});

export const productUpdateQuantityInputSchema = z.object({
  quantity: z.coerce.number(),
});

export type ProductCreateInput = z.infer<typeof productCreateInputSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateInputSchema>;
