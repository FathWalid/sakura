import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export function Catalogue() {
  const [banners, setBanners] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  // 🌸 Charger les bannières actives depuis le backend
  useEffect(() => {
    fetch(`${API}/api/banners`)
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch(() => setBanners([]));
  }, [API]);

  // 🎠 Carrousel automatique (toutes les 4 secondes)
  useEffect(() => {
    if (!banners.length || paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners, paused]);

  // 🌷 Collections fixes
  const collections = [
    {
      name: "Sakura Parfums",
      description:
        "Une sélection raffinée de parfums de marques emblématiques, choisies pour leur élégance, leur qualité et leur caractère unique. L’alliance parfaite entre luxe, douceur et modernité.",
      image: "/sakura-banner.jpg",
      link: "/catalogue-sakura",
    },
    {
      name: "Zara Parfums",
      description:
        "Une collection moderne et accessible, inspirée du style urbain et de la féminité contemporaine. Des senteurs légères, fraîches et sophistiquées pour le quotidien.",
      image: "/zara-banner.jpg",
      link: "/catalogue-zara",
    },
    {
      name: "Rituals",
      description:
        "Des fragrances apaisantes et sensorielles, inspirées des rituels de bien-être. Un voyage olfactif qui transforme les gestes du quotidien en moments de sérénité.",
      image: "/rituals-banner.png",
      link: "/catalogue-rituals",
    },
    {
      name: "Décants",
      description:
        "Découvrez nos décants — des échantillons authentiques de parfums de luxe en petits formats (2ml, 5ml, 10ml) pour explorer vos fragrances préférées à prix doux.",
      image: "/decants-banner.jpg",
      link: "/catalogue-decants",
    },
  ];

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      {/* 🌸 Panneau d’animation (carrousel automatique) */}
      {banners.length > 0 && (
        <div
          className="relative w-full h-[250px] md:h-[300px] mb-12 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.a
              key={banners[current]._id}
              href={banners[current].link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 block"
            >
              <img
                src={`${API}${banners[current].image}`}
                alt={banners[current].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold">
                </h3>
                <p className="text-sm opacity-90">
                </p>
              </div>
            </motion.a>
          </AnimatePresence>

          {/* ⚪ Petits points de navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current ? "bg-white scale-110" : "bg-white/40"
                }`}
              ></button>
            ))}
          </div>
        </div>
      )}

      {/* 🌿 Section collections */}
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
            Explorez nos univers olfactifs : Sakura, Zara, Rituals et Décants.
          </p>
        </motion.div>

        {/* 🪷 Cartes de collections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {collections.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
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
