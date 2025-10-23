import { Hero } from "../components/Hero";
import { motion } from "framer-motion";
import { Sparkles, Clock, Heart } from "lucide-react";

export function Home() {
  return (
    <div>
      {/* 🪷 Section Hero */}
      <Hero />

      {/* 🌸 Section Pourquoi Choisir Sakura */}
      <section className="py-24 px-6 bg-cream">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-teal-dark text-center mb-16"
          >
            Pourquoi Choisir <span className="text-gold">SAKURA</span> ?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Sparkles,
                title: "Qualité Premium",
                text: "Des parfums créés avec les ingrédients les plus nobles et les techniques les plus raffinées.",
              },
              {
                icon: Clock,
                title: "Longue Tenue",
                text: "Des fragrances qui durent toute la journée, de l'aube au crépuscule.",
              },
              {
                icon: Heart,
                title: "Créé avec Passion",
                text: "Chaque parfum est une œuvre d'art, conçue pour exprimer votre personnalité unique.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-rose-powder rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-teal-dark" />
                </div>
                <h3 className="text-2xl font-serif text-teal-dark mb-4">{item.title}</h3>
                <p className="text-text-gray leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 💐 Section Collections */}
      <section className="py-24 px-6 bg-teal-dark">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-rose-powder mb-8"
          >
            Découvrez Nos Collections
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cream text-lg leading-relaxed mb-12"
          >
            Explorez trois univers olfactifs uniques — <span className="text-gold">Sakura</span>,
            <span className="text-gold"> Zara</span> et <span className="text-gold">Rituals</span> —
            chacun révélant une facette différente de votre élégance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="/catalogue"
              className="inline-block px-10 py-4 bg-rose-powder text-teal-dark font-sans uppercase tracking-wider text-sm rounded-lg hover:bg-gold hover:scale-105 transition-all duration-300"
            >
              Sakura Parfums
            </a>
            <a
              href="/catalogue-zara"
              className="inline-block px-10 py-4 bg-rose-powder text-teal-dark font-sans uppercase tracking-wider text-sm rounded-lg hover:bg-gold hover:scale-105 transition-all duration-300"
            >
              Zara Parfums
            </a>
            <a
              href="/catalogue-rituals"
              className="inline-block px-10 py-4 bg-rose-powder text-teal-dark font-sans uppercase tracking-wider text-sm rounded-lg hover:bg-gold hover:scale-105 transition-all duration-300"
            >
              Rituals
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
