import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getProductById, getProducts } from "../services/ProductService";
import { useCartStore } from "../store/CartStore";
import Card from "../components/Card";

// Small presentational components to keep the main component concise
const LoadingSkeleton = () => (
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

const ErrorCard = ({ message, onRetry, onBack, children }) => (
  <div className="p-6">
    <div className="max-w-md p-6 mx-auto border border-red-100 rounded shadow bg-red-50">
      <h3 className="mb-2 text-lg font-semibold text-red-700">Error loading product</h3>
      <p className="mb-4 text-sm text-red-600">{message}</p>
      <div className="flex gap-3 mb-4">
        <button onClick={onRetry} className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">Retry</button>
        <button onClick={onBack} className="px-4 py-2 border rounded hover:bg-gray-100">Back to products</button>
      </div>
    </div>
    {children}
  </div>
);

const RecentCarousel = ({ items, trackRef, isPausedRef, withControls = true }) => {
  const scrollBy = (px) => {
    const t = trackRef.current;
    if (!t) return;
    isPausedRef.current = true;
    t.scrollLeft = Math.max(0, t.scrollLeft + px);
    setTimeout(() => (isPausedRef.current = false), 1200);
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="max-w-6xl p-4 mx-auto mt-10">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Recent products</h2>
      <div className="relative overflow-hidden">
        {withControls && (
          <div className="flex items-center justify-between mb-2">
            <button aria-label="Scroll left" onClick={() => scrollBy(-260)} className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded shadow-sm hover:bg-gray-50">Prev</button>
            <button aria-label="Scroll right" onClick={() => scrollBy(260)} className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded shadow-sm hover:bg-gray-50">Next</button>
          </div>
        )}

        <div ref={trackRef} className="flex gap-4 py-4 overflow-x-auto no-scrollbar"
          onMouseEnter={() => (isPausedRef.current = true)}
          onMouseLeave={() => (isPausedRef.current = false)}
          onPointerDown={() => (isPausedRef.current = true)}
          onPointerUp={() => (isPausedRef.current = false)}
          style={{ scrollBehavior: "smooth" }}>
          {[...items, ...items].map((p, idx) => (
            <div key={`${p._id}-${idx}`} className="min-w-[220px]">
              <Card product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
  const scrollSpeed = useMemo(() => 0.4, []);

  const fetchRecent = useCallback(async () => {
    try {
      const res = await getProducts({ page: 1, limit: 8, sort: "-createdAt" });
      setRecent(res.products || []);
    } catch (err) {
      console.debug("Failed to load recent products", err);
    }
  }, []);

  const fetchProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const p = await getProductById(id);
      setProduct(p);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (productId) fetchProduct(productId);
  }, [productId, fetchProduct]);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  // Auto-scroll implementation
  useEffect(() => {
    const track = trackRef.current;
    if (!track || recent.length === 0) return;

    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      if (isPausedRef.current) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      track.scrollLeft += scrollSpeed;
      const half = track.scrollWidth / 2;
      if (track.scrollLeft >= half) track.scrollLeft = track.scrollLeft - half;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [recent, scrollSpeed]);

  const onAddToCart = useCallback(() => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) addItem(product);
  }, [product, quantity, addItem]);

  const retryLoad = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await fetchProduct(productId);
      await fetchRecent();
    } finally {
      setLoading(false);
    }
  }, [productId, fetchProduct, fetchRecent]);

  if (loading) return <LoadingSkeleton />;
  if (error)
    return (
      <ErrorCard message={error} onRetry={retryLoad} onBack={() => navigate("/products")}> 
        <RecentCarousel items={recent} trackRef={trackRef} isPausedRef={isPausedRef} withControls={false} />
      </ErrorCard>
    );
  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <>
      <div className="max-w-4xl p-6 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto max-h-[500px] object-contain rounded shadow" />
          </div>

          <div>
            <h1 className="mb-2 text-3xl font-semibold">{product.name}</h1>
            <p className="mb-4 text-gray-600">Category: {product.category}</p>
            <p className="mb-4 text-2xl font-bold">${product.price.toFixed(2)}</p>
            <p className="mb-6 text-gray-800">{product.description || "No description."}</p>

            <div className="flex items-center gap-4 mb-6">
              <label className="mr-2">Quantity</label>
              <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))} className="w-20 p-2 border rounded" />
            </div>

            <div className="flex gap-3">
              <button onClick={onAddToCart} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Add to cart</button>
              <button onClick={() => navigate("/products")} className="px-4 py-2 border rounded hover:bg-gray-100">Back to products</button>
            </div>
          </div>
        </div>
      </div>

      <RecentCarousel items={recent} trackRef={trackRef} isPausedRef={isPausedRef} withControls={true} />
    </>
  );
};

export default Product;
