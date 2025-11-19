import { Button } from "@/components/ui/button";
import { addItem, removeCartItem } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { Loader, Minus, Plus } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const QuantityButton = ({ item }: { item: CartItem }) => {
  const [isIncreasing, startIncrease] = useTransition();
  const [isDecreasing, startDecreasing] = useTransition();
  const increaseQty = () => {
    startIncrease(async () => {
      const response = await addItem(item);
      if (response.success) {
        toast.success(`${item.name} added`);
      } else {
        toast.error(response.message);
      }
    });
  };

  const decreaseQty = () => {
    startDecreasing(async () => {
      const response = await removeCartItem(item.productId);
      if (response.success) {
        toast.success(`${item.name} removed`);
      } else {
        toast.error(response.message);
      }
    });
  };
  return (
    <div className="flex gap-4 items-center">
      <Button
        variant={"outline"}
        type="button"
        disabled={isDecreasing}
        onClick={decreaseQty}
        className="w-14 h-10"
      >
        {isDecreasing ? <Loader className="animate-spin" /> : <Minus />}
      </Button>
      {item.qty}
      <Button
        variant={"outline"}
        type="button"
        disabled={isIncreasing}
        onClick={increaseQty}
        className="w-14 h-10"
      >
        {isIncreasing ? <Loader className="animate-spin" /> : <Plus />}
      </Button>
    </div>
  );
};
export default QuantityButton;
