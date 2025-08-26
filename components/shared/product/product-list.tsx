import { Product } from "@/types";
import ProductCard from "./product-card";

type Props = {
  data: Product[];
  title: string;
  limit: number;
};
const ProductList = ({ data, title, limit }: Props) => {
  const limitedData = data.slice(0, limit);
  return (
    <div className="my-10 w-full">
      <h2 className="font-bold text-2xl mb-4">{title}</h2>
      {limitedData.length > 0 ? (
        <div className="grid  gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
          {data.slice(0, limit).map((product) => {
            return <ProductCard key={product.slug} product={product} />;
          })}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
