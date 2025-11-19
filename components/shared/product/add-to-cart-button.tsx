"use client";

import QuantityButton from "@/components/shared/product/quantity-button";
import { Button } from "@/components/ui/button";
import { addItem } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const AddToCardButton = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();
  const [adding, startAdding] = useTransition();

  const addToCart = () => {
    startAdding(async () => {
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
    });
  };

  // check if item is in cart
  const existingItem =
    cart && cart.items.find((x) => x.productId === item.productId);
  return existingItem ? (
    <QuantityButton
      item={{
        ...item,
        qty: existingItem.qty,
      }}
    />
  ) : (
    <Button
      className="w-full hover:cursor-pointer"
      type="button"
      onClick={addToCart}
    >
      {adding ? <Loader className="h-4 w-4 animate-spin" /> : <Plus />}
      Add To Cart
    </Button>
  );
};

export default AddToCardButton;
