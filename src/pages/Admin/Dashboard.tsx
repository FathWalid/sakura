import { useContext, useEffect, useState } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { DashboardLayout } from "../../components/admin/DashboardLayout";
import { ProductForm } from "../../components/admin/ProductForm";
import { ProductTable } from "../../components/admin/ProductTable";

export function AdminDashboard() {
  const { token, logout } = useContext(AdminAuthContext);
  const [products, setProducts] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    const res = await fetch(`${API}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  const addProduct = async (formData: FormData) => {
    const res = await fetch(`${API}/api/products`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (res.ok) fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await fetch(`${API}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <DashboardLayout onLogout={logout}>
      <h1 className="text-3xl font-semibold text-pink-600 mb-6">
        🌸 Gestion des Produits
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ProductForm onAdd={addProduct} />
        </div>

        <div>
          <ProductTable products={products} onDelete={deleteProduct} />
        </div>
      </div>
    </DashboardLayout>
  );
}
