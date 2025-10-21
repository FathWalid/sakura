import { motion } from "framer-motion";
import { Mail, MessageCircle, Instagram, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("💌 Message envoyé avec succès !");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Erreur lors de l’envoi du message.");
      }
    } catch (error) {
      toast.error("⚠️ Impossible d’envoyer le message pour le moment.");
    } finally {
      setLoading(false);
    }
  };

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
          {/* 🌸 Infos de contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-3xl font-serif text-teal-dark mb-8">
                Informations de Contact
              </h2>

              <div className="space-y-6">
                <ContactItem icon={<MessageCircle />} title="WhatsApp" value="+34 742 08 30 46" link="https://wa.me/34742083046" />
                <ContactItem icon={<Mail />} title="Email" value="contact@sakuraessence.com" link="mailto:contact@sakuraessence.com" />
                <ContactItem icon={<Instagram />} title="Instagram" value="@sakuraa.essence" link="https://instagram.com/sakuraa.essence" />
                <ContactItem icon={<MapPin />} title="Adresse" value="Rabat, Maroc" />
                <ContactItem icon={<Phone />} title="Téléphone" value="+212 6 63 12 51 22" link="tel:+212663125122" />
              </div>
            </div>

            <div className="bg-teal-dark rounded-lg p-8">
              <h3 className="text-2xl font-serif text-rose-powder mb-4">Horaires d'ouverture</h3>
              <div className="flex justify-between text-cream">
                <span>Lundi - Dimanche</span>
                <span>9h00 - 20h00</span>
              </div>
            </div>
          </motion.div>

          {/* 🌸 Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg p-8 shadow-md"
          >
            <h2 className="text-3xl font-serif text-teal-dark mb-8">
              Envoyez-nous un Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email", "subject"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-teal-dark font-semibold mb-2">
                    {field === "name"
                      ? "Nom complet"
                      : field === "email"
                      ? "Email"
                      : "Sujet"}
                  </label>
                  <input
                    id={field}
                    type={field === "email" ? "email" : "text"}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-teal-dark/20 focus:border-rose-powder focus:ring-2 focus:ring-rose-powder/20 outline-none transition-colors"
                    placeholder={
                      field === "name"
                        ? "Votre nom"
                        : field === "email"
                        ? "votre@email.com"
                        : "Sujet de votre message"
                    }
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-teal-dark font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-teal-dark/20 focus:border-rose-powder focus:ring-2 focus:ring-rose-powder/20 outline-none transition-colors resize-none"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-dark text-cream px-6 py-4 rounded-lg hover:bg-teal-medium transition-colors duration-300 uppercase text-sm tracking-wider font-semibold"
              >
                {loading ? "Envoi en cours..." : "Envoyer le Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ✅ Petit composant pour les items de contact
function ContactItem({ icon, title, value, link }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-rose-powder rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-teal-dark mb-1">{title}</h3>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-text-gray hover:text-rose-powder transition-colors">
            {value}
          </a>
        ) : (
          <p className="text-text-gray">{value}</p>
        )}
      </div>
    </div>
  );
}
