import React, { useState, useEffect } from 'react'
import { getProducts } from '../services/ProductService'
import Products from '../components/Products';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 py-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Home</h2>
      <div className="w-full max-w-6xl">
        <Products products={products} />
      </div>
    </main>
  )
}

export default Home