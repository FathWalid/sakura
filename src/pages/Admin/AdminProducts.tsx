import { useState, useEffect, useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { DashboardLayout } from "../../components/admin/DashboardLayout";
import { ProductForm } from "../../components/admin/ProductForm";
import { ProductTable } from "../../components/admin/ProductTable";
import { motion } from "framer-motion";
import { Package, FlaskConical, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export function AdminProducts() {
  const { token, logout } = useContext(AdminAuthContext);
  const [activeTab, setActiveTab] = useState<"sakura" | "zara" | "rituals">("sakura");
  const [products, setProducts] = useState<any[]>([]);
  const API = import.meta.env.VITE_API_URL;

  const endpointMap = {
    sakura: `${API}/api/products`,
    zara: `${API}/api/zara-products`,
    rituals: `${API}/api/rituals-products`,
  };

  // 🔹 Charger les produits de la catégorie sélectionnée
  const fetchProducts = async () => {
    try {
      const res = await fetch(endpointMap[activeTab]);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      toast.error("Erreur de chargement des produits");
    }
  };

  // 🔹 Ajouter un produit (POST)
  const addProduct = async (formData: FormData) => {
    try {
      const res = await fetch(endpointMap[activeTab], {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error();
      toast.success("Produit ajouté !");
      fetchProducts();
    } catch {
      toast.error("Erreur lors de l'ajout du produit");
    }
  };

  // 🔹 Supprimer un produit
  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`${endpointMap[activeTab]}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      toast.success("Produit supprimé !");
      fetchProducts();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  return (
    <DashboardLayout onLogout={logout}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-pink-600">🧴 Gestion des Produits</h1>
      </div>

      {/* 🌸 Tabs (Sakura / Zara / Rituals) */}
      <div className="flex gap-3 mb-8">
        {[
          { id: "sakura", icon: Sparkles, label: "Sakura Parfums" },
          { id: "zara", icon: Package, label: "Zara Parfums" },
          { id: "rituals", icon: FlaskConical, label: "Rituals" },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all ${
              activeTab === id
                ? "bg-pink-600 text-white border-pink-600 shadow-md scale-105"
                : "bg-white border-gray-200 hover:bg-pink-50 text-gray-700"
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* 🧩 Grille Produits */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ProductForm
              onAdd={addProduct}
              mode={activeTab === "rituals" ? "rituals" : "default"}
            />
          </div>

          <div>
            <ProductTable products={products} onDelete={deleteProduct} />
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
