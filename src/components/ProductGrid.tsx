import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [filter, setFilter] = useState<string>("Tous");
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();

  // 🌸 Déterminer la collection actuelle
  let collectionPrefix = "/produit";
  if (location.pathname.includes("zara")) collectionPrefix = "/zara-produits";
  if (location.pathname.includes("rituals")) collectionPrefix = "/rituals-produits";

  // 🔹 Genres uniques (Femme / Homme / Unisexe)
  const genres = ["Tous", ...Array.from(new Set(products.map((p) => p.notes)))];

  // 🔍 Filtrage principal (genre + recherche)
  const filteredProducts = products.filter((p) => {
    const matchGenre =
      filter === "Tous" ||
      (p.notes && p.notes.toLowerCase() === filter.toLowerCase());
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  // 💡 Auto-suggest (mise à jour quand on tape)
  useEffect(() => {
    if (search.trim().length > 0) {
      const matches = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [search, products]);

  return (
    <div className="py-16 relative">
      {/* 🔎 Barre de recherche */}
      <div className="flex flex-col items-center mb-10 relative">
        <div className="relative w-80 md:w-96">
          <input
            type="text"
            placeholder="🔍 Rechercher un parfum..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="w-full border border-gray-300 rounded-full px-5 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold transition"
          />

          {/* 🪄 Liste des suggestions animée */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-md mt-1 w-full max-h-60 overflow-auto"
              >
                {suggestions.map((p) => (
                  <Link
                    key={p._id}
                    to={`${collectionPrefix}/${p._id}`}
                    className="block px-4 py-2 hover:bg-gold/10 transition"
                  >
                    <div className="flex items-center gap-3">
                      {p.images?.[0] && (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${p.images[0]}`}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{p.name}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {p.notes || "Sans catégorie"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 🔹 Filtres par genre */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setFilter(genre)}
            className={`px-6 py-2 rounded-full uppercase text-sm tracking-wider transition-all duration-300 ${
              filter === genre
                ? "bg-gold text-teal-dark shadow-lg scale-105"
                : "bg-teal-dark/10 text-teal-dark hover:bg-teal-dark/20"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* 🧴 Grille des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              link={`${collectionPrefix}/${product._id}`}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Aucun parfum trouvé.
          </p>
        )}
      </div>
    </div>
  );
}
