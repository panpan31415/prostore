import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/db/sample-data";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "./product-price";

type Props = {
  product: Product;
};
const ProductCard = ({ product }: Props) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>{product.name}</Link>
        <div className="flex justify-between gap-4">
          <p>{product.rating} Stars </p>
          {product.stock > 0 ? (
            <ProductPrice value={product.price} className="font-bold"/>
           
          ) : (
            <p className="text-destructive">Out Of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
