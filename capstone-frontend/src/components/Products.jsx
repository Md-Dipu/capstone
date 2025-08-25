import React from "react";

const Products = ({ products = [] }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">Price: <span className="font-bold text-blue-600">${product.price}</span></p>
          {/* Add more product details or actions here if needed */}
        </div>
      ))}
    </section>
  );
};

export default Products;
