// Packages
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import axios from "axios";

// Components
import { ProductCard, Search } from "../components";

// Hooks
import { useFetchProducts } from "../hooks/useFetchProducts";

// Types
import { TProductItem } from "../components/ProductCard";

const Home: NextPage = () => {
  // -------------------------------------------------
  // Hooks
  // -------------------------------------------------
  const { products, error } = useFetchProducts()

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <main data-testid="product-list" className="my-8">
      <Search doSearch={() => console.log()} />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">
          200+ Products
        </span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {
            products.map((product: TProductItem) => (
              <ProductCard
                product={product}
                addToCart={() => console.log()}
                key={product.id}
              />
            ))
          }
        </div>
      </div>
    </main>
  );
};

export default Home;
