"use server";

import { CartItem } from "@/types";
import { convert, formatError, round2 } from "../utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";

const calculatePrice = (items: CartItem[]) => {
  const itemsPrice = round2(
    items.reduce((accumulator, item) => {
      return accumulator + Number(item.price) * item.qty;
    }, 0)
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

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
    const product = await prisma.product.findFirst({
      where: {
        id: item.productId,
      },
    });

    if (!product) {
      throw new Error("Product Found");
    }
    if (!cart) {
      console.log(54, userId);
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calculatePrice([item]),
      });
      await prisma.cart.create({
        data: newCart,
      });

      // revalidate product page
      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: product.name + " added to cart",
      };
    } else {
      const existItem = cart.items.find(
        (item) => item.productId === cartItem.productId
      );
      if (existItem) {
        // check stock
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }
        existItem.qty = existItem.qty + 1;
      } else {
        if (product.stock < 1) new Error("Not enough stock");
        cart.items.push(cartItem);
      }
    }
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items,
        ...calculatePrice(cart.items),
      },
    });
    revalidatePath(`/product/${product.slug}`);
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

export async function removeCartItem(productId: string) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");
    // get product
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    // check item
    const itemInCart = cart.items.find((item) => item.productId === productId);
    if (!itemInCart) {
      throw new Error("item not found");
    }
    // check only 1 item
    if (itemInCart.qty === 1) {
      cart.items = cart.items.filter((item) => item.productId !== productId);
    } else {
      itemInCart.qty -= 1;
    }

    // update cart in db
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: cart.items,
        ...calculatePrice(cart.items),
      },
    });
    revalidatePath(`/product/${product.slug}`);
    return {
      success: true,
      message: `${product.name} was removed from cart`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
