import { motion } from 'framer-motion';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { createWhatsAppUrl, createProductMessage } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWhatsAppOrder = () => {
    const message = createProductMessage(product, 1);
    const url = createWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-cream rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-gold text-teal-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {product.type}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-serif text-teal-dark mb-2">{product.name}</h3>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-text-gray">
            <span className="font-semibold">Notes:</span> {product.notes}
          </p>
          <p className="text-sm text-text-gray">
            <span className="font-semibold">Durée:</span> {product.duration}
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-3xl font-serif text-teal-dark font-bold">{product.price}€</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-teal-dark text-cream px-6 py-3 rounded-lg hover:bg-teal-medium transition-colors duration-300 flex items-center justify-center gap-2 uppercase text-sm tracking-wider"
          >
            <ShoppingBag className="w-4 h-4" />
            Ajouter
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="bg-rose-powder text-teal-dark px-6 py-3 rounded-lg hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2 uppercase text-sm tracking-wider"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
        </div>
      </div>
    </motion.div>
  );
}
