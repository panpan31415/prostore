"use server";

import prisma from "@/db/prisma";
import { Product } from "@/types";

export async function getLatestProducts(take: number) {
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

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
  });
  return product;
}
