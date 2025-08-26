import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getProducts, getCategories } from "../services/ProductService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        // res is array of { category, count }
        setCategories(res.map((c) => c.category));
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when page or selectedCategory changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { page, limit: 8 };
        if (selectedCategory) params.category = selectedCategory;
        const res = await getProducts(params);
        setProducts(res.products || []);
        setPages(res.pages || 1);
        setTotal(res.total || 0);
      } catch {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, selectedCategory]);
  return (
    <main className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 to-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center text-blue-800 drop-shadow-sm">
          Product Catalog
        </h1>
        {/* Category Filter */}
        {!loading && categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button
              className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors border-blue-200 ${
                !selectedCategory
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-700 hover:bg-blue-50"
              }`}
              onClick={() => {
                setSelectedCategory("");
                setPage(1);
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors border-blue-200 ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-700 hover:bg-blue-50"
                }`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center h-40">
            <div className="w-12 h-12 border-4 border-blue-300 rounded-full border-t-blue-600 animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 text-red-700 bg-red-100 rounded shadow">
              {error}
            </span>
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="mb-4 text-sm text-right text-gray-600">
              Total results:{" "}
              <span className="font-semibold text-blue-700">{total}</span>
            </div>
            <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products?.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </section>
            {pages > 1 && (
              <div className="flex justify-center mt-10">
                <nav
                  className="inline-flex gap-1 rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    className="px-3 py-1 text-blue-700 bg-white border border-blue-200 rounded-l hover:bg-blue-50 disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      className={`px-3 py-1 border border-blue-200 ${
                        p === page
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-700 hover:bg-blue-50"
                      }`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    className="px-3 py-1 text-blue-700 bg-white border border-blue-200 rounded-r hover:bg-blue-50 disabled:opacity-50"
                    onClick={() => setPage((p) => Math.min(pages, p + 1))}
                    disabled={page === pages}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Products;
