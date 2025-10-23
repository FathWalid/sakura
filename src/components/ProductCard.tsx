import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { createWhatsAppUrl } from "../utils/whatsapp";
import toast, { Toaster } from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const API = import.meta.env.VITE_API_URL;

  // 🪷 Déterminer la collection actuelle
  let collectionPrefix = "/produit";
  if (location.pathname.includes("zara")) collectionPrefix = "/zara-produits";
  if (location.pathname.includes("rituals")) collectionPrefix = "/rituals-produits";

  // 💰 Déterminer le premier prix
  const firstPrice = product.prices?.[0];
  const mainPrice = firstPrice?.amount || 0;
  const mainOption = firstPrice?.volume || firstPrice?.size || "";

  // 🖼️ Image du produit
  const imageUrl =
    product.images?.[0]
      ? product.images[0].startsWith("http")
        ? product.images[0]
        : `${API}${product.images[0]}`
      : "/default-parfum.jpg";

  // 🔔 Toast minimaliste
  const showToast = () => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          } transition-all duration-300 bg-white border border-pink-200 shadow-lg rounded-xl px-6 py-3 flex items-center gap-3`}
        >
          <div className="bg-pink-100 p-2 rounded-full">
            <ShoppingBag className="w-5 h-5 text-pink-600" />
          </div>
          <div className="text-teal-dark font-medium font-serif tracking-wide">
            Produit ajouté au panier 🛍️
          </div>
        </div>
      ),
      {
        duration: 2000,
        position: "top-center",
      }
    );
  };

  // ➕ Ajouter au panier
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      _id: product._id,
      name: product.name,
      type: product.type,
      notes: product.notes,
      image: imageUrl,
      selectedOption: mainOption,
      price: mainPrice,
      quantity: 1,
    });
    showToast();
  };

  // 🔍 Ouvrir la page détail
  const handleOpenDetail = () => {
    navigate(`${collectionPrefix}/${product._id}`);
  };

  // 💬 Commander sur WhatsApp
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Bonjour 🌸 Je suis intéressé par *${product.name}* (${mainOption}) à ${mainPrice} MAD.`;
    const url = createWhatsAppUrl(msg);
    window.open(url, "_blank");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={handleOpenDetail}
        className="bg-cream rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      >
        {/* 🖼️ Image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            onError={(e) => (e.currentTarget.src = "/default-parfum.jpg")}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.type && (
            <div className="absolute top-4 right-4 bg-gold text-teal-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.type}
            </div>
          )}
        </div>

        {/* 🧴 Infos */}
        <div className="p-5 text-center">
          <h3 className="text-xl font-serif text-teal-dark group-hover:text-pink-600 transition-colors mb-1">
            {product.name}
          </h3>
          {product.notes && (
            <p className="text-gray-500 text-sm mb-1">
              <span className="font-semibold">Genre :</span> {product.notes}
            </p>
          )}

          {mainOption && (
            <p className="text-gray-500 text-sm mb-3">
              <span className="font-semibold">
                {firstPrice?.volume ? "Volume" : "Taille"} :
              </span>{" "}
              {mainOption}
              {firstPrice?.volume ? " ml" : ""}
            </p>
          )}

          <p className="text-2xl font-serif text-pink-600 font-bold mb-4">
            {mainPrice} MAD
          </p>

          {/* Boutons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-teal-dark text-cream px-5 py-2 rounded-lg hover:bg-teal-medium flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition"
            >
              <ShoppingBag className="w-4 h-4" /> Ajouter
            </button>

            <button
              onClick={handleWhatsAppOrder}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition text-sm uppercase tracking-wider"
            >
              💬 WhatsApp
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
