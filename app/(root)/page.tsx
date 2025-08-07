import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";

export const metadata = {
  title: {
    template: `%s | ProStore`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase:new URL(SERVER_URL)
};


export default  function Home() {
  return <ProductList data={sampleData.products} title="Newest Arrivals" limit={4}/>;
}
