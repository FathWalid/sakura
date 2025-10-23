import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Catalogue() {
  const collections = [
    {
      name: "Sakura Parfums",
      description:
        "L'essence de la délicatesse japonaise. Des fragrances florales et équilibrées, symbole d’élégance intemporelle.",
      image: "/sakura-banner.jpg", // tu peux mettre tes vraies images
      link: "/catalogue-sakura" || "/catalogue", // fallback pour Sakura
      gradient: "from-rose-powder to-rose-300",
    },
    {
      name: "Zara Parfums",
      description:
        "Une collection moderne, audacieuse et accessible inspirée du style urbain et de la sophistication européenne.",
      image: "/zara-banner.jpg",
      link: "/catalogue-zara",
      gradient: "from-gold to-yellow-300",
    },
    {
      name: "Rituals",
      description:
        "Des senteurs apaisantes et harmonieuses pour transformer vos routines en moments de bien-être absolu.",
      image: "/rituals-banner.jpg",
      link: "/catalogue-rituals",
      gradient: "from-teal-600 to-teal-400",
    },
  ];

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
            Nos Collections de Parfums
          </h1>
          <p className="text-xl text-text-gray max-w-2xl mx-auto leading-relaxed">
            Explorez nos trois univers olfactifs : Sakura, Zara et Rituals.
          </p>
        </motion.div>

        {/* 🪷 Cartes de collections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {collections.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image d’arrière-plan */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-40`}
                ></div>
              </div>

              {/* Contenu */}
              <div className="p-6 text-center">
                <h3 className="text-2xl font-serif text-teal-dark mb-3">
                  {c.name}
                </h3>
                <p className="text-text-gray mb-6 leading-relaxed">
                  {c.description}
                </p>

                <Link
                  to={c.link}
                  className="inline-block px-8 py-3 bg-rose-powder text-teal-dark uppercase tracking-wider text-sm rounded-lg hover:bg-gold hover:scale-105 transition-all duration-300"
                >
                  Découvrir
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
