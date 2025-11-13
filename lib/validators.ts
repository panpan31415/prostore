//schema for inserting products

import z from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine((val) =>
    /^DKK\d+(\.\d{2})?/.test(formatNumberWithDecimal(Number(val)))
  );
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must at least have one string"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// schema for signing in users
export const signInFormSchema = z.object({
  email: z.email("Invalid Email Address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
