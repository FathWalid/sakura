import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductGrid } from "../components/ProductGrid";
import { Product } from "../types/product";

export function CatalogueRituals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/api/rituals-products`);
        if (!res.ok) throw new Error("Erreur lors du chargement des produits Rituals");
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
          };
        });

        setProducts(formatted);
      } catch (err: any) {
        console.error(err);
        setError("Impossible de charger les produits Rituals pour le moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif text-teal-dark mb-6">
            Collection Rituals
          </h1>
          <p className="text-xl text-text-gray max-w-2xl mx-auto leading-relaxed">
            Une expérience sensorielle unique à travers nos gammes Rituals.
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-500">Chargement des produits...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">Aucun produit disponible pour le moment.</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
