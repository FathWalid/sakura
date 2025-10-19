import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-teal-dark/95 backdrop-blur-sm border-b border-rose-powder/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <h1 className="text-2xl font-serif font-bold tracking-wide">
              <span className="text-rose-powder">SAK</span>
              <span className="text-gold">U</span>
              <span className="text-rose-powder">RA</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-cream hover:text-rose-powder transition-colors text-sm uppercase tracking-wider"
            >
              Accueil
            </Link>
            <Link
              to="/catalogue"
              className="text-cream hover:text-rose-powder transition-colors text-sm uppercase tracking-wider"
            >
              Catalogue
            </Link>
            <Link
              to="/contact"
              className="text-cream hover:text-rose-powder transition-colors text-sm uppercase tracking-wider"
            >
              Contact
            </Link>
          </nav>

          <Link
            to="/panier"
            className="relative p-2 hover:bg-rose-powder/10 rounded-lg transition-colors"
          >
            <ShoppingBag className="w-6 h-6 text-cream" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-teal-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <nav className="md:hidden flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-rose-powder/10">
          <Link
            to="/"
            className="text-cream hover:text-rose-powder transition-colors text-xs uppercase tracking-wider"
          >
            Accueil
          </Link>
          <Link
            to="/catalogue"
            className="text-cream hover:text-rose-powder transition-colors text-xs uppercase tracking-wider"
          >
            Catalogue
          </Link>
          <Link
            to="/contact"
            className="text-cream hover:text-rose-powder transition-colors text-xs uppercase tracking-wider"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
