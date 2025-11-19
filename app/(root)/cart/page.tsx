import React from "react";
import CartTable from "./cart-table";
import { getMyCart } from "@/lib/actions/cart.actions";

export const metadata = {
  title: "Shopping Cart",
};

export default async function CartPage() {
  const cart = await getMyCart();
  if (!cart) {
    return null;
  }
  return (
    <div className="mt-5">
      <CartTable cart={cart} />
    </div>
  );
}
