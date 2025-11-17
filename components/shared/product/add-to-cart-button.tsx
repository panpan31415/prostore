"use client";

import { Button } from "@/components/ui/button";
import { addItem, removeCartItem } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCardButton = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();

  const removeItem = async () => {
    const res = await removeCartItem(item.productId);
    if (res.success) {
      toast.success(res.message);
      return;
    }
    toast.error(res.message);
  };

  const addItemToCart = async () => {
    const res = await addItem(item);
    if (res.success) {
      toast.success(res.message);
      return;
    }
    toast.error(res.message);
  };

  const addToCart = async () => {
    const res = await addItem(item);
    if (res.success) {
      toast.success("Success", {
        position: "bottom-right",
        description: `${item.name} added to cart`,
        action: (
          <Button
            className="bg-primary   hover:bg-gray-400 hover:cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            Go to cart
          </Button>
        ),
      });
    } else {
      toast.error("Failed", {
        position: "bottom-right",
        description: res.message,
      });
      return;
    }
  };

  // check if item is in cart
  const existingItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existingItem ? (
    <div className="w-full hover:cursor-pointer flex justify-around items-center">
      <Button type="button" variant={"outline"} onClick={removeItem}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="x-2">{existingItem?.qty || 0}</span>
      <Button type="button" variant={"outline"} onClick={addItemToCart}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button
      className="w-full hover:cursor-pointer"
      type="button"
      onClick={addToCart}
    >
      <Plus />
      Add To Cart
    </Button>
  );
};

export default AddToCardButton;
