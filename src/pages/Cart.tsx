import { motion } from 'framer-motion';
import { Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createWhatsAppUrl, createCartMessage } from '../utils/whatsapp';
import { Link } from 'react-router-dom';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    const message = createCartMessage(cart);
    const url = createWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <ShoppingBag className="w-24 h-24 text-teal-dark/20 mx-auto mb-8" />
            <h1 className="text-4xl font-serif text-teal-dark mb-6">Votre panier est vide</h1>
            <p className="text-text-gray mb-8 text-lg">
              Découvrez notre collection de parfums exquis et ajoutez vos favoris au panier.
            </p>
            <Link
              to="/catalogue"
              className="inline-block px-12 py-4 bg-teal-dark text-cream font-sans uppercase tracking-wider text-sm rounded-lg hover:bg-teal-medium transition-colors duration-300"
            >
              Voir le Catalogue
            </Link>
          </motion.div>
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
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md flex gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-2xl font-serif text-teal-dark mb-2">{item.name}</h3>
                  <p className="text-text-gray text-sm mb-4">{item.notes}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-teal-dark/10 hover:bg-teal-dark/20 rounded flex items-center justify-center text-teal-dark font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold text-teal-dark">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-teal-dark/10 hover:bg-teal-dark/20 rounded flex items-center justify-center text-teal-dark font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-serif text-teal-dark font-bold">
                        {item.price * item.quantity}€
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-rose-powder hover:bg-rose-powder/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-8 shadow-md h-fit sticky top-32"
          >
            <h2 className="text-2xl font-serif text-teal-dark mb-6">Récapitulatif</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-text-gray">
                <span>Sous-total</span>
                <span>{totalPrice}€</span>
              </div>
              <div className="flex justify-between text-text-gray">
                <span>Livraison</span>
                <span>À définir</span>
              </div>
              <div className="border-t border-teal-dark/10 pt-4 flex justify-between text-2xl font-serif text-teal-dark font-bold">
                <span>Total</span>
                <span>{totalPrice}€</span>
              </div>
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
              className="w-full bg-rose-powder/20 text-teal-dark px-6 py-3 rounded-lg hover:bg-rose-powder/30 transition-colors duration-300 text-sm"
            >
              Vider le panier
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
