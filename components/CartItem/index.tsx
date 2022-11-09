/* eslint-disable @next/next/no-img-element */
// Packages
import React, { useState } from "react";
import { useCartStore } from "../../store/cart";

type TProductItem = {
  id: string;
  image: string;
  price: string;
  title: string;
};

type TCartItemProps = {
  product: TProductItem;
};

const CartItem: React.FC<TCartItemProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const { open, products } = useCartStore((store) => store.state)
  const { remove } = useCartStore((store) => store.actions)
  // ------------------------------------------------
  // Funcitons
  // -------------------------------------------------

  const onDecrease = () => {
    setQuantity((value) => value > 0 ? value - 1 : 0)
  }

  const onIncrease = () => {
    setQuantity((value) => value + 1)
  }

  // ------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <div
      className="flex justify-between mt-6"
      data-testid="cart-item"
    >
      <div className="flex" >
        <img
          className="h-20 w-20 object-cover rounded"
          src={product?.image}
          alt={product?.title}
        />
        <div className="mx-3">
          <h3 className="text-sm text-gray-600">{product?.title}</h3>
          <button onClick={() => {
            remove(product)
          }}>remove</button>
          <div className="flex items-center mt-2">
            <button
              aria-label="decrease cart button"
              onClick={onDecrease}
              className="text-gray-500 focus:outline-none focus:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
            <span
              aria-label="total products"
              className="text-gray-700 mx-2"
              data-testid="quantity"
            >
              {quantity}
            </span>
            <button
              aria-label="increase cart button"
              onClick={onIncrease}
              className="text-gray-500 focus:outline-none focus:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <span className="text-gray-600">{product?.price}$</span>
    </div>
  );
};

export default CartItem;
