import { Hero } from '../components/Hero';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Heart } from 'lucide-react';

export function Home() {
  return (
    <div>
      <Hero />

      <section className="py-24 px-6 bg-cream">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-teal-dark text-center mb-16"
          >
            Pourquoi Choisir SAKURA?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-rose-powder rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-teal-dark" />
              </div>
              <h3 className="text-2xl font-serif text-teal-dark mb-4">Qualité Premium</h3>
              <p className="text-text-gray leading-relaxed">
                Des parfums créés avec les ingrédients les plus nobles et les techniques les plus raffinées.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-rose-powder rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-teal-dark" />
              </div>
              <h3 className="text-2xl font-serif text-teal-dark mb-4">Longue Tenue</h3>
              <p className="text-text-gray leading-relaxed">
                Des fragrances qui durent toute la journée, de l'aube au crépuscule.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-rose-powder rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-teal-dark" />
              </div>
              <h3 className="text-2xl font-serif text-teal-dark mb-4">Créé avec Passion</h3>
              <p className="text-text-gray leading-relaxed">
                Chaque parfum est une œuvre d'art, conçue pour exprimer votre personnalité unique.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-teal-dark">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-rose-powder mb-8"
          >
            Découvrez Notre Collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cream text-lg leading-relaxed mb-12"
          >
            Explorez une gamme de parfums sophistiqués, alliant tradition et modernité,
            pour révéler l'essence de votre élégance.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            href="/catalogue"
            className="inline-block px-12 py-4 bg-rose-powder text-teal-dark font-sans uppercase tracking-wider text-sm rounded-lg hover:bg-gold hover:scale-105 transition-all duration-300"
          >
            Voir le Catalogue
          </motion.a>
        </div>
      </section>
    </div>
  );
}
