"use server";

import { CartItem } from "@/types";
import { convert, formatError } from "../utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import prisma from "@/db/prisma";
import z from "zod";
import { cartItemSchema } from "../validators";

export async function addItem(cartItem: CartItem) {
  try {
    const sessionCookies = await cookies();
    const sessionCartId = sessionCookies.get("sessionCartId")?.value;
    if (!sessionCartId) {
      throw new Error("Cart session not found!");
    }
    const session = await auth();
    const userId = session?.user?.id || undefined;

    const cart = await getMyCart();

    const item = cartItemSchema.parse(cartItem);

    // find product in db
    const product = prisma.product.findFirst({
      where: {
        id: item.productId,
      },
    });
    if (session && session.user) {
    }
    if (sessionCartId) {
    }
    return {
      success: true,
      message: "Item added to cart",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyCart() {
  const sessionCookies = await cookies();
  const sessionCartId = sessionCookies.get("sessionCartId")?.value;
  if (!sessionCartId) {
    throw new Error("Cart session not found");
  }
  const session = await auth();
  const userId = session?.user?.id;
  const cart = await prisma.cart.findFirst({
    where: userId
      ? {
          userId,
        }
      : { sessionCartId },
  });
  if (!cart) {
    return undefined;
  }
  return convert({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
