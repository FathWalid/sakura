import { motion } from 'framer-motion';
import { Mail, MessageCircle, Instagram, MapPin, Phone } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif text-teal-dark mb-6">
            Contactez-Nous
          </h1>
          <p className="text-xl text-text-gray max-w-2xl mx-auto leading-relaxed">
            Nous sommes à votre écoute pour toute question ou demande spéciale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-3xl font-serif text-teal-dark mb-8">Informations de Contact</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rose-powder rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-teal-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-dark mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/212600000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-gray hover:text-rose-powder transition-colors"
                    >
                      +34 742 08 30 46
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rose-powder rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-teal-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-dark mb-1">Email</h3>
                    <a
                      href="mailto:contact@sakura-parfums.com"
                      className="text-text-gray hover:text-rose-powder transition-colors"
                    >
                      contact@sakuraessence.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rose-powder rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-teal-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-dark mb-1">Instagram</h3>
                    <a
                      href="https://instagram.com/sakuraa.essence"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-gray hover:text-rose-powder transition-colors"
                    >
                      @sakuraa.essence
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rose-powder rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-teal-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-dark mb-1">Adresse</h3>
                    <p className="text-text-gray">
                      Rabat, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rose-powder rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-teal-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-dark mb-1">Téléphone</h3>
                    <a
                      href="tel:+212600000000"
                      className="text-text-gray hover:text-rose-powder transition-colors"
                    >
                      +212 6 63 12 51 22
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-dark rounded-lg p-8">
              <h3 className="text-2xl font-serif text-rose-powder mb-4">Horaires d'ouverture</h3>
              <div className="space-y-2 text-cream">
                <div className="flex justify-between">
                  <span>Lundi - Dimanche</span>
                  <span>9h00 - 20h00</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg p-8 shadow-md"
          >
            <h2 className="text-3xl font-serif text-teal-dark mb-8">Envoyez-nous un Message</h2>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-teal-dark font-semibold mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-teal-dark/20 focus:border-rose-powder focus:ring-2 focus:ring-rose-powder/20 outline-none transition-colors"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-teal-dark font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-teal-dark/20 focus:border-rose-powder focus:ring-2 focus:ring-rose-powder/20 outline-none transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-teal-dark font-semibold mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-teal-dark/20 focus:border-rose-powder focus:ring-2 focus:ring-rose-powder/20 outline-none transition-colors"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-teal-dark font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-teal-dark/20 focus:border-rose-powder focus:ring-2 focus:ring-rose-powder/20 outline-none transition-colors resize-none"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-dark text-cream px-6 py-4 rounded-lg hover:bg-teal-medium transition-colors duration-300 uppercase text-sm tracking-wider font-semibold"
              >
                Envoyer le Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
