import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getProductById } from "../services/ProductService";
import { getProducts } from "../services/ProductService";
import { useCartStore } from "../store/CartStore";
import Card from "../components/Card";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(productId);
        if (mounted) setProduct(data);
      } catch (err) {
        console.error(err);
        if (mounted)
          setError(
            err?.response?.data?.message || err.message || "Failed to load product"
          );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (productId) load();
    return () => {
      mounted = false;
    };
  }, [productId]);

  // Fetch recent products for the carousel
  useEffect(() => {
    let mounted = true;
    const fetchRecent = async () => {
      try {
        // Request most recent products: sort by createdAt desc, limit 8
        const res = await getProducts({ page: 1, limit: 8, sort: "-createdAt" });
        if (mounted) setRecent(res.products || []);
      } catch (err) {
        // ignore recent fetch errors silently
        console.debug("Failed to load recent products", err);
      }
    };
    fetchRecent();
    return () => (mounted = false);
  }, []);

  const onAddToCart = () => {
    if (!product) return;
    // Add product with requested quantity. Cart store will coalesce by _id.
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  if (loading) return <div className="p-8">Loading product...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <>
    <div className="max-w-4xl p-6 mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-contain rounded shadow"
          />
        </div>

        <div>
          <h1 className="mb-2 text-3xl font-semibold">{product.name}</h1>
          <p className="mb-4 text-gray-600">Category: {product.category}</p>
          <p className="mb-4 text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="mb-6 text-gray-800">{product.description || 'No description.'}</p>

          <div className="flex items-center gap-4 mb-6">
            <label className="mr-2">Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
              className="w-20 p-2 border rounded"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onAddToCart}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Add to cart
            </button>

            <button
              onClick={() => navigate('/products')}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Back to products
            </button>
          </div>
        </div>
      </div>
  </div>
  {/* Recent products carousel */}
    {recent && recent.length > 0 && (
      <section className="max-w-6xl p-4 mx-auto mt-10">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Recent products</h2>

        {/* Auto-scrolling horizontal track. Pause on hover. */}
        <div className="relative overflow-hidden">
          <style>{`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          <div
            className="flex gap-4 py-4 will-change-transform"
            style={{
              display: "flex",
              width: "max-content",
              animation: `scroll-left 18s linear infinite`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
          >
            {/* Duplicate items to create seamless loop */}
            {[...recent, ...recent].map((p, idx) => (
              <div key={`${p._id}-${idx}`} className="min-w-[220px]">
                <Card product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )}
    </>
  );
};

export default Product;
