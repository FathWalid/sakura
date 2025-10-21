import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  const mainPrice = product.prices?.[0]?.amount || 0;
  const mainVolume = product.prices?.[0]?.volume || 50;

  const API = import.meta.env.VITE_API_URL;
  const imageUrl =
    product.images?.[0]
      ? product.images[0].startsWith("http")
        ? product.images[0]
        : `${API}${product.images[0]}`
      : "/default-parfum.jpg";

  // 🔹 Notification élégante & minimaliste
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
        position: "top-center", // 🔸 s'affiche sous le header
      }
    );
  };

  // ➕ Ajouter au panier + notification
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    addToCart({
      _id: product._id,
      name: product.name,
      type: product.type,
      notes: product.notes,
      image: imageUrl,
      selectedVolume: mainVolume,
      price: mainPrice,
      quantity: 1,
    });

    showToast();
  };

  // 💬 Commander sur WhatsApp
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Bonjour 🌸 Je suis intéressé par le parfum *${product.name}* (${mainVolume}ml) à ${mainPrice} MAD.`;
    const url = createWhatsAppUrl(msg);
    window.open(url, "_blank");
  };

  // 🔍 Ouvrir la page détail
  const handleOpenDetail = () => {
    navigate(`/produit/${product._id}`);
  };

  return (
    <>
      {/* 🔔 Toaster global (placé ici pour catalogue & détail) */}
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={handleOpenDetail}
        className="bg-cream rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      >
        {/* IMAGE */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            onError={(e) => (e.currentTarget.src = "/default-parfum.jpg")}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 bg-gold text-teal-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {product.type}
          </div>
        </div>

        {/* CONTENU */}
        <div className="p-6">
          <h3 className="text-2xl font-serif text-teal-dark mb-2">{product.name}</h3>
          <p className="text-sm text-text-gray mb-2">
            <span className="font-semibold">Genre :</span> {product.notes || "—"}
          </p>
          <p className="text-sm text-text-gray mb-4">
            <span className="font-semibold">Volume :</span> {mainVolume} ml
          </p>

          <span className="text-3xl font-serif text-teal-dark font-bold block mb-4">
            {mainPrice} MAD
          </span>

          {/* BOUTONS */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-teal-dark text-cream px-6 py-3 rounded-lg hover:bg-teal-medium transition-colors duration-300 flex items-center justify-center gap-2 uppercase text-sm tracking-wider"
            >
              <ShoppingBag className="w-4 h-4" />
              Ajouter
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
