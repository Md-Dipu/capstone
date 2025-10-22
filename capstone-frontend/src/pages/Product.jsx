import React, { useEffect, useRef, useState } from "react";
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
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const isPausedRef = useRef(false);
  const scrollSpeed = 0.4; // pixels per frame (approx)

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

  // Auto-scroll using RAF and allow manual controls
  useEffect(() => {
    const track = trackRef.current;
    if (!track || recent.length === 0) return;

    // Ensure the duplicated content is wide enough
    const step = () => {
      if (isPausedRef.current) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      // move by speed
      track.scrollLeft += scrollSpeed;
      // when we've scrolled past the first set, reset back
      const half = track.scrollWidth / 2;
      if (track.scrollLeft >= half) {
        track.scrollLeft = track.scrollLeft - half;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [recent]);

  const onAddToCart = () => {
    if (!product) return;
    // Add product with requested quantity. Cart store will coalesce by _id.
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const retryLoad = async () => {
    setError(null);
    setLoading(true);
    try {
      const p = await getProductById(productId);
      setProduct(p);
      // refresh recent products as well
      const res = await getProducts({ page: 1, limit: 8, sort: "-createdAt" });
      setRecent(res.products || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="h-64 bg-gray-100 rounded animate-pulse" />
            <div>
              <div className="w-3/4 h-6 mb-3 bg-gray-100 rounded animate-pulse" />
              <div className="w-1/3 h-4 mb-2 bg-gray-100 rounded animate-pulse" />
              <div className="w-1/4 h-8 mb-4 bg-gray-100 rounded animate-pulse" />
              <div className="h-24 mb-4 bg-gray-100 rounded animate-pulse" />
              <div className="flex items-center gap-4">
                <div className="w-20 h-10 bg-gray-100 rounded animate-pulse" />
                <div className="w-32 h-10 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );

  if (error)
    return (
      <div className="p-6">
        <div className="max-w-md p-6 mx-auto border border-red-100 rounded shadow bg-red-50">
          <h3 className="mb-2 text-lg font-semibold text-red-700">Error loading product</h3>
          <p className="mb-4 text-sm text-red-600">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={retryLoad}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Retry
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
    );

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
          <div className="flex items-center justify-between mb-2">
            <button
              aria-label="Scroll left"
              onClick={() => {
                const t = trackRef.current;
                if (!t) return;
                isPausedRef.current = true;
                t.scrollLeft = Math.max(0, t.scrollLeft - 260);
                // resume after short delay
                setTimeout(() => (isPausedRef.current = false), 1200);
              }}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded shadow-sm hover:bg-gray-50"
            >
              Prev
            </button>

            <button
              aria-label="Scroll right"
              onClick={() => {
                const t = trackRef.current;
                if (!t) return;
                isPausedRef.current = true;
                t.scrollLeft = t.scrollLeft + 260;
                setTimeout(() => (isPausedRef.current = false), 1200);
              }}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded shadow-sm hover:bg-gray-50"
            >
              Next
            </button>
          </div>

          <div
            ref={trackRef}
            className="flex gap-4 py-4 overflow-x-auto no-scrollbar"
            onMouseEnter={() => (isPausedRef.current = true)}
            onMouseLeave={() => (isPausedRef.current = false)}
            onPointerDown={() => (isPausedRef.current = true)}
            onPointerUp={() => (isPausedRef.current = false)}
            style={{ scrollBehavior: "smooth" }}
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
