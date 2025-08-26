import React from "react";
import { useCartStore } from "../store/CartStore";

const Card = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="flex flex-col w-full max-w-xs overflow-hidden transition-shadow bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-2xl">
      <div className="flex items-center justify-center w-full h-48 overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold text-white bg-blue-500 rounded-full w-fit">
          {product.category}
        </span>
        <h3
          className="mb-1 text-xl font-bold text-gray-800 truncate"
          title={product.name}
        >
          {product.name}
        </h3>
        <p
          className="mb-3 text-gray-600 text-sm line-clamp-2 min-h-[2.5em]"
          title={product.description}
        >
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>
          <button
            className="px-3 py-1 text-sm font-semibold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => addItem(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
