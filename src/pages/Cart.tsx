import { motion } from "framer-motion";
import { Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { createWhatsAppUrl, createCartMessage } from "../utils/whatsapp";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  // Champs du client
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const API = import.meta.env.VITE_API_URL;

  const handleCheckout = async () => {
    if (!customer.name || !customer.email || !customer.phone) {
      toast.error("Veuillez renseigner votre nom, email et téléphone 📱");
      return;
    }

    const message = createCartMessage(cart, customer.name, customer.phone, customer.email);
    const url = createWhatsAppUrl(message);

    // ✅ Enregistrer la commande côté backend
    try {
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            volume: item.selectedVolume,
            quantity: item.quantity,
            price: item.price,
          })),
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          total: totalPrice,
          status: "En attente",
        }),
      });

      if (res.ok) {
        toast.success("Commande enregistrée ✅");
        window.open(url, "_blank");
        clearCart();
      } else {
        toast.error("Erreur lors de l’enregistrement de la commande ❌");
      }
    } catch (error) {
      console.error("Erreur lors de l’envoi :", error);
      toast.error("Impossible d’envoyer la commande !");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <ShoppingBag className="w-24 h-24 text-teal-dark/20 mx-auto mb-8" />
          <h1 className="text-4xl font-serif text-teal-dark mb-6">Votre panier est vide</h1>
          <p className="text-text-gray mb-8 text-lg">
            Découvrez notre collection de parfums exquis et ajoutez vos favoris.
          </p>
          <Link
            to="/catalogue"
            className="inline-block px-12 py-4 bg-teal-dark text-cream uppercase tracking-wider text-sm rounded-lg hover:bg-teal-medium transition"
          >
            Voir le Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-serif text-teal-dark mb-12"
        >
          Votre Panier
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🧾 Liste des produits */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <motion.div
                key={`${item._id}-${item.selectedVolume}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md flex gap-6"
              >
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `${import.meta.env.VITE_API_URL}${item.image}`
                  }
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-2xl font-serif text-teal-dark mb-1">{item.name}</h3>
                  <p className="text-sm text-text-gray mb-2">
                    <span className="font-semibold">Volume :</span> {item.selectedVolume} ml
                  </p>
                  <p className="text-text-gray text-sm mb-4">{item.notes}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.selectedVolume, item.quantity - 1)
                        }
                        className="w-8 h-8 bg-teal-dark/10 hover:bg-teal-dark/20 rounded flex items-center justify-center text-teal-dark font-bold"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold text-teal-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.selectedVolume, item.quantity + 1)
                        }
                        className="w-8 h-8 bg-teal-dark/10 hover:bg-teal-dark/20 rounded flex items-center justify-center text-teal-dark font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-serif text-teal-dark font-bold">
                        {item.price * item.quantity} MAD
                      </span>
                      <button
                        onClick={() => removeFromCart(item._id, item.selectedVolume)}
                        className="p-2 text-rose-powder hover:bg-rose-powder/10 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 🧮 Récapitulatif + infos client */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-8 shadow-md h-fit sticky top-32"
          >
            <h2 className="text-2xl font-serif text-teal-dark mb-6">Vos Informations</h2>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Nom complet"
                className="w-full border rounded-lg px-4 py-2 focus:border-teal-dark"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-2 focus:border-teal-dark"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Téléphone"
                className="w-full border rounded-lg px-4 py-2 focus:border-teal-dark"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              />
            </div>

            <h3 className="text-xl font-serif text-teal-dark mb-4">Récapitulatif</h3>
            <div className="flex justify-between text-text-gray mb-2">
              <span>Sous-total</span>
              <span>{totalPrice} MAD</span>
            </div>

            <div className="border-t border-teal-dark/10 pt-4 flex justify-between text-2xl font-serif text-teal-dark font-bold mb-6">
              <span>Total</span>
              <span>{totalPrice} MAD</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-teal-dark text-cream px-6 py-4 rounded-lg hover:bg-teal-medium transition-colors duration-300 flex items-center justify-center gap-2 uppercase text-sm tracking-wider mb-4"
            >
              <MessageCircle className="w-5 h-5" />
              Commander via WhatsApp
            </button>

            <button
              onClick={clearCart}
              className="w-full bg-rose-powder/20 text-teal-dark px-6 py-3 rounded-lg hover:bg-rose-powder/30 transition-colors text-sm"
            >
              Vider le panier
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
