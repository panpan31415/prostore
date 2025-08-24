"use server";

import { PrismaClient } from "../generated/prisma";
import { convert } from "../utils";

export async function getLatestProducts(take: number) {
  const prisma = new PrismaClient();
  const data = await prisma.product.findMany({
    take,
    orderBy: {
      createdAt: "desc",
    },
  });
  const convertedData = data.map((product) => ({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
    createdAt: product.createdAt.toISOString(),
    banner: String(product.banner),
  }));
  // const convertedData = convert(data);
  return convertedData;
}
