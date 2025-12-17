import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DashboardLayout } from "../../components/admin/DashboardLayout";
import { ProductForm } from "../../components/admin/ProductForm";
import { ProductTable } from "../../components/admin/ProductTable";

export function AdminZara() {
  const API = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/api/zara-products`);
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Erreur lors du chargement des produits ZARA");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data: FormData) => {
    try {
      const res = await fetch(`${API}/api/zara-products`, {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error();
      toast.success("Produit ZARA ajouté !");
      fetchProducts();
    } catch {
      toast.error("Erreur ajout produit ZARA");
    }
  };

  const handleUpdate = async (id: string, data: FormData) => {
    try {
      const res = await fetch(`${API}/api/zara-products/${id}`, {
        method: "PUT",
        body: data,
      });
      if (!res.ok) throw new Error();
      toast.success("Produit modifié !");
      fetchProducts();
      setEditingProduct(null);
    } catch {
      toast.error("Erreur de mise à jour");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      await fetch(`${API}/api/zara-products/${id}`, { method: "DELETE" });
      toast.success("Produit supprimé !");
      fetchProducts();
    } catch {
      toast.error("Erreur suppression");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <DashboardLayout onLogout={() => localStorage.removeItem("adminToken")}>
      <div>
        <h1 className="text-3xl font-serif text-pink-600 mb-6">👔 Gestion des Parfums ZARA</h1>

        <ProductForm
          onAdd={!editingProduct ? handleAdd : undefined}
          onUpdate={editingProduct ? (data) => handleUpdate(editingProduct._id, data) : undefined}
          editingProduct={editingProduct}
        />

        {loading ? (
          <p className="text-gray-500 mt-6">Chargement...</p>
        ) : (
          <ProductTable
            products={products}
            onDelete={handleDelete}
            onEdit={(p) => setEditingProduct(p)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
