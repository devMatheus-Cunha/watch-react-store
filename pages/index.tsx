// Packages
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import axios from "axios";

// Components
import { ProductCard, Search } from "../components";

// Hooks
import { ProductsType, useFetchProducts } from "../hooks/useFetchProducts";

// Types
import { TProductItem } from "../components/ProductCard";

const Home: NextPage = () => {
  // -------------------------------------------------
  // States
  // -------------------------------------------------
  const { products, error } = useFetchProducts();

  const [term, setTerm] = useState("");
  const [localProducts, setLocalProducts] = useState<ProductsType>([]);

  // -------------------------------------------------
  // Hooks
  // -------------------------------------------------
  useEffect(() => {
    if (term === "") {
      setLocalProducts(products);
    } else {
      setLocalProducts(
        products.filter(({ title }: { title: string }) => {
          return title.toLowerCase().includes(term.toLowerCase());
        })
      );
    }
  }, [products, term]);

  // -------------------------------------------------
  // Functions
  // -------------------------------------------------
  const renderProductList = () => {
    if (localProducts.length === 0 && !error) {
      return <h4 data-testid="no-products">No products</h4>

    }
    return localProducts.map((product: TProductItem) => (
      <ProductCard
        product={product}
        addToCart={() => console.log()}
        key={product.id}
      />
    ))
  }

  const renderErrorMessage = () => {
    if (!error) {
      return null
    }
    return <h4 data-testid="server-products">Server is down</h4>
  }
  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <main data-testid="product-list" className="my-8">
      <Search doSearch={(term: string) => setTerm(term)} />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">
          200+ Products
        </span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {renderErrorMessage()}
          {renderProductList()}
        </div>
      </div>
    </main>
  );
};

export default Home;
