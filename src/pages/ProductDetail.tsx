import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { createWhatsAppUrl } from "../utils/whatsapp";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

export function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [typeLabel, setTypeLabel] = useState("Volume");

  // 🔍 Déterminer la collection (Sakura, Zara, Rituals)
  let collection = "products";
  if (location.pathname.includes("zara")) collection = "zara-products";
  if (location.pathname.includes("rituals")) collection = "rituals-products";

  // 🔹 Charger le produit depuis le bon endpoint
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API}/api/${collection}/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Erreur serveur");

        setProduct(data);

        // ✅ première image sélectionnée
        const mainImg = data.images?.[0];
        const imageUrl =
          mainImg?.startsWith("http") || mainImg?.startsWith("/uploads")
            ? `${API}${mainImg}`
            : mainImg;
        setSelectedImage(imageUrl);

        // ✅ détecte type de prix (ml ou taille)
        if (data.prices && data.prices.length > 0) {
          const firstPrice = data.prices[0];
          if (firstPrice.volume) {
            setSelectedOption(firstPrice.volume);
            setTypeLabel("Volume");
          } else if (firstPrice.size) {
            setSelectedOption(firstPrice.size);
            setTypeLabel("Taille");
          }
          setPrice(firstPrice.amount);
        }
      } catch (err) {
        console.error("Erreur chargement produit:", err);
        navigate("/catalogue");
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen text-pink-600 font-serif text-xl">
          Chargement du parfum...
        </div>
        <Footer />
      </>
    );
  }

  // 🌸 Notification visuelle sous le header
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

  // 🔹 Changement du volume ou taille
  const handleOptionChange = (option: string | number, amount: number) => {
    setSelectedOption(option);
    setPrice(amount);
  };

  // 🔹 Ajouter au panier
  const handleAddToCart = () => {
    addToCart({
      ...product,
      price,
      selectedOption,
      image:
        product.images?.[0]?.startsWith("http") || product.images?.[0]?.startsWith("/uploads")
          ? `${API}${product.images[0]}`
          : product.images[0],
    });
    showToast();
  };

  // 🔹 Commander via WhatsApp
  const handleWhatsApp = () => {
    const msg = `Bonjour 🌸 Je suis intéressé par *${product.name}* (${typeLabel}: ${selectedOption}) à ${price} MAD.`;
    window.open(createWhatsAppUrl(msg), "_blank");
  };

  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen bg-cream pt-32 pb-16">
        <div className="container mx-auto px-6 lg:flex gap-12">
          {/* 🎞️ Galerie d’images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="rounded-2xl shadow-2xl w-full h-[480px] object-cover mb-4"
            />
            <div className="flex gap-3 justify-center">
              {product.images.map((img: string, i: number) => {
                const imgUrl =
                  img.startsWith("http") || img.startsWith("/uploads")
                    ? `${API}${img}`
                    : img;
                return (
                  <img
                    key={i}
                    src={imgUrl}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${
                      selectedImage === imgUrl
                        ? "border-pink-500"
                        : "border-transparent"
                    }`}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* 🪷 Détails du produit */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h1 className="text-5xl font-serif text-teal-dark mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-text-gray mb-4">{product.description}</p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Type :</span> {product.type}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Genre :</span> {product.notes}
            </p>

            {/* Sélection volume ou taille */}
            <h3 className="text-lg font-semibold mb-2">
              {typeLabel}s disponibles :
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {product.prices.map((p: any, i: number) => {
                const label = p.volume || p.size;
                return (
                  <button
                    key={i}
                    onClick={() => handleOptionChange(label, p.amount)}
                    className={`px-5 py-2 rounded-full border transition ${
                      selectedOption === label
                        ? "bg-pink-600 text-white border-pink-600"
                        : "border-pink-400 text-pink-600 hover:bg-pink-100"
                    }`}
                  >
                    {p.volume ? `${p.volume} ml` : p.size}
                  </button>
                );
              })}
            </div>

            {/* Prix affiché */}
            <div className="text-4xl font-serif text-pink-600 font-bold mb-8">
              {price} MAD
            </div>

            {/* Boutons d’action */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-teal-dark text-cream py-3 rounded-lg hover:bg-teal-medium flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Ajouter au panier
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                💬 Commander via WhatsApp
              </button>
            </div>

            {/* Retour */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-pink-600 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Retour au catalogue
            </button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
