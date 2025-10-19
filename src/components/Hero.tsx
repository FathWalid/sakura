import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-teal-dark overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-dark/50 via-teal-dark/70 to-teal-dark"></div>

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/1030945/pexels-photo-1030945.jpeg?auto=compress&cs=tinysrgb&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-wide">
            <span className="text-rose-powder">SAK</span>
            <span className="text-gold">U</span>
            <span className="text-rose-powder">RA</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-3xl text-cream font-serif mb-4"
        >
          L'essence de votre personnalité,
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-3xl text-cream font-serif mb-12"
        >
          dans chaque goutte
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link
            to="/catalogue"
            className="inline-block px-12 py-4 bg-rose-powder text-teal-dark font-sans uppercase tracking-wider text-sm rounded-lg hover:bg-gold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Voir le Catalogue
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-rose-powder animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
