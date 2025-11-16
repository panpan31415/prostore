"use client";

import { Button } from "@/components/ui/button";
import { addItem } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCardButton = ({ item }: { item: CartItem }) => {
  const router = useRouter();
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
  return (
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
