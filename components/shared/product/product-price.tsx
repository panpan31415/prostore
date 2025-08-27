import { cn } from "@/lib/utils";

type Props = {
  value: string;
  className?: string;
};

const ProductPrice = ({ value, className }: Props) => {
  const [intValue, floatValue] = value.split(".");
  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">DKK</span>
      {intValue}
      <span className="text-xs align-super">{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
