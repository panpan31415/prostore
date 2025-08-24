import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

export const metadata = {
  title: {
    template: `%s | ProStore`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default async function Home() {
  const data = await getLatestProducts(10);
  return <ProductList data={data} title="Newest Arrivals" limit={10} />;
}
