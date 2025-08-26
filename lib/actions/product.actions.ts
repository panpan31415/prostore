"use server";

import { Product } from "@/types";
import { PrismaClient } from "../generated/prisma";

export async function getLatestProducts(take: number) {
  const prisma = new PrismaClient();
  const data = await prisma.product.findMany({
    take,
    orderBy: {
      createdAt: "desc",
    },
  });
  const convertedData: Product[] = data.map((product) => ({
    ...product,
    price: String(product.price),
    rating: String(product.rating),
    createdAt: new Date(product.createdAt.toISOString()),
    banner: String(product.banner),
  }));
  // const convertedData = convert(data);
  return convertedData;
}
