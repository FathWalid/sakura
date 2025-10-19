import { motion } from 'framer-motion';
import { ProductGrid } from '../components/ProductGrid';
import { products } from '../data/products';

export function Catalogue() {
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
            Notre Catalogue
          </h1>
          <p className="text-xl text-text-gray max-w-2xl mx-auto leading-relaxed">
            Découvrez notre collection exclusive de parfums, créés pour sublimer chaque moment de votre vie.
          </p>
        </motion.div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
