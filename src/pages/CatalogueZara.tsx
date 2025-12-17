import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductGrid } from "../components/ProductGrid";
import { Product } from "../types/product";
import { Link } from "react-router-dom";

export function CatalogueZara() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("nouveaute"); // 🔸 "prix" | "top" | "nouveaute"
  const API = import.meta.env.VITE_API_URL;

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/api/zara-products`);
        if (!res.ok) throw new Error("Erreur lors du chargement des produits Zara");
        const data = await res.json();

        const formatted = data.map((p: any) => {
          const firstImage = p.images?.[0];
          let imageUrl = "/default-parfum.jpg";

          if (firstImage) {
            if (firstImage.startsWith("http")) imageUrl = firstImage;
            else if (firstImage.startsWith("/uploads")) imageUrl = `${API}${firstImage}`;
            else imageUrl = `${API}/uploads/${firstImage}`;
          }

          return {
            ...p,
            image: imageUrl,
            price: p.prices?.[0]?.amount || 0,
            createdAt: new Date(p.createdAt || Date.now()),
          };
        });

        setProducts(formatted);
      } catch (err: any) {
        console.error(err);
        setError("Impossible de charger les produits Zara pour le moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Tri dynamique
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "prix") return a.price - b.price;
    if (sort === "top") return b.price - a.price; // simulation
    if (sort === "nouveaute") return b.createdAt.getTime() - a.createdAt.getTime();
    return 0;
  });

  // 🔹 Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="container mx-auto px-6">
        {/* 🔙 Retour */}
        <div className="mb-8 flex justify-between items-center">
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-dark text-white hover:bg-teal-700 transition-all shadow-md"
          >
            ← Retour aux collections
          </Link>

          {/* 🔽 Filtre de tri */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <option value="nouveaute">Nouveautés</option>
            <option value="prix">Prix croissant</option>
            <option value="top">Top ventes</option>
          </select>
        </div>

        {/* 🏷️ Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl md:text-6xl font-serif text-teal-dark mb-4">
            Collection ZARA Parfums
          </h1>
          <p className="text-xl text-text-gray">
            Découvrez nos parfums les plus populaires et nos nouveautés.
          </p>
        </motion.div>

        {/* 📦 Produits */}
        {loading ? (
          <p className="text-center text-gray-500">Chargement des produits...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : paginatedProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucun produit disponible pour le moment.
          </p>
        ) : (
          <ProductGrid products={paginatedProducts} />
        )}

        {/* 📄 Pagination */}
        <div className="flex justify-center mt-10 gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              page === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-teal-dark text-white hover:bg-teal-700"
            }`}
          >
            ← Précédent
          </button>

          <span className="px-4 py-2 text-teal-dark font-medium">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              page === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-teal-dark text-white hover:bg-teal-700"
            }`}
          >
            Suivant →
          </button>
        </div>
      </div>
    </div>
  );
}
