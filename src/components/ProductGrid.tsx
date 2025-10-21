import { useState } from "react";
import { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [filter, setFilter] = useState<string>("Tous");

  // 🔹 Extraire les genres uniques à partir du champ "notes"
  const genres = ["Tous", ...Array.from(new Set(products.map((p) => p.notes)))];

  // 🔹 Filtrer les produits par genre
  const filteredProducts =
    filter === "Tous"
      ? products
      : products.filter(
          (p) => p.notes?.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="py-16">
      {/* 🔹 Boutons de filtre */}
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

      {/* 🔹 Grille des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Aucun parfum trouvé pour ce genre.
          </p>
        )}
      </div>
    </div>
  );
}
