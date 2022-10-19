// Packages
import React from "react";

type TProductItem = {
  title: string;
  price: string;
  image: string;
  id: string;
};

type TProductCardProps = {
  product: TProductItem;
};

const ProductCard: React.FC<TProductCardProps> = ({ product }) => {
  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <section >
      <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
        <div
          className="flex items-end justify-end h-56 w-full bg-cover"
          style={{
            backgroundImage: `url(${product?.image})`,
          }}
        >
          <button
            onClick={() => console.log(product)}
            className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              aria-label="add to cart button"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </button>
        </div>
        <div className="px-5 py-3">
          <h3 className="text-gray-700 uppercase">{product?.title}</h3>
          <span className="text-gray-500 mt-2">{product?.price}</span>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;