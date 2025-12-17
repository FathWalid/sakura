import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DashboardLayout } from "../../components/admin/DashboardLayout";
import { ProductForm } from "../../components/admin/ProductForm";
import { ProductTable } from "../../components/admin/ProductTable";

export function AdminDecants() {
  const API = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Charger les produits Décants
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/api/decants-products`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      toast.error("Erreur lors du chargement des produits Décants");
    }
  };

  // 🔹 Ajouter un produit
  const handleAdd = async (formData: FormData) => {
    try {
      const res = await fetch(`${API}/api/decants-products`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        toast.success("Produit ajouté ✅");
        fetchProducts();
      } else toast.error("Erreur lors de l’ajout");
    } catch {
      toast.error("Erreur serveur");
    }
  };

  // 🔹 Modifier un produit
  const handleUpdate = async (formData: FormData) => {
    if (!editingProduct) return;
    try {
      const res = await fetch(`${API}/api/decants-products/${editingProduct._id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        toast.success("Produit modifié ✏️");
        setEditingProduct(null);
        fetchProducts();
      } else toast.error("Erreur de mise à jour");
    } catch {
      toast.error("Erreur serveur");
    }
  };

  // 🔹 Supprimer un produit
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      const res = await fetch(`${API}/api/decants-products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Produit supprimé 🗑️");
        fetchProducts();
      } else toast.error("Erreur de suppression");
    } catch {
      toast.error("Erreur serveur");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <DashboardLayout onLogout={() => localStorage.removeItem("adminToken")}>
      <h1 className="text-3xl font-serif text-pink-600 mb-6">
        💧 Gestion des Décants
      </h1>

      <ProductForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingProduct={editingProduct}
        mode="default" // utilise volume (pas size)
      />

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Chargement...</p>
      ) : (
        <ProductTable
          products={products}
          onDelete={handleDelete}
          onEdit={(p) => setEditingProduct(p)}
        />
      )}
    </DashboardLayout>
  );
}
