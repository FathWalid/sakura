import { Instagram, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-teal-dark border-t border-rose-powder/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-serif font-bold tracking-wide mb-4">
              <span className="text-rose-powder">SAK</span>
              <span className="text-gold">U</span>
              <span className="text-rose-powder">RA</span>
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              L'essence de votre personnalité, dans chaque goutte
            </p>
          </div>

          <div>
            <h4 className="text-rose-powder font-sans uppercase text-sm tracking-wider mb-4">
              Liens Rapides
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-cream/70 hover:text-rose-powder transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/catalogue" className="text-cream/70 hover:text-rose-powder transition-colors">
                  Catalogue
                </a>
              </li>
              <li>
                <a href="/contact" className="text-cream/70 hover:text-rose-powder transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-rose-powder font-sans uppercase text-sm tracking-wider mb-4">
              Suivez-nous
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-rose-powder/10 hover:bg-rose-powder/20 rounded-lg transition-colors"
              >
                <Instagram className="w-5 h-5 text-rose-powder" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-rose-powder/10 hover:bg-rose-powder/20 rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-rose-powder" />
              </a>
              <a
                href="mailto:contact@sakura-parfums.com"
                className="p-2 bg-rose-powder/10 hover:bg-rose-powder/20 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5 text-rose-powder" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-rose-powder/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-cream/50">
          <p>&copy; 2025 SAKURA Parfums. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-rose-powder transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-rose-powder transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
