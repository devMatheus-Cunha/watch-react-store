// Packages
import type { NextPage } from "next";

// Components
import { ProductCard, Search } from "../components";

const Home: NextPage = () => {
  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <main data-testid="product-list" className="my-8">
      <Search />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">
          200+ Products
        </span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          <ProductCard
            product={{
              title: 'Relógio bonitor',
              price: "22",
              image: "https://fpfportugalstorest01prd.blob.core.windows.net/blobfuse/images/KRBpzWaBs4kJ8A89LIdoDyLgGrwsH97cqrMT6qsVeRrfD5Wt3yDYfkaAQ6c7y46L.jpeg",
              id: "1"
            }}
            key="teste"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
