import { z } from "zod";

export const createSweetSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  price: z.number().positive(),
  quantity: z.number().int().nonnegative(),
});

export const updateSweetSchema = z.object({
  name: z.string().min(2).optional(),
  category: z.string().min(2).optional(),
  price: z.number().positive().optional(),
  quantity: z.number().int().nonnegative().optional(),
});
