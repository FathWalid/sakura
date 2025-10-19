// src/pages/Admin.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    image_url: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Charger les produits
  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: true });
    if (!error) setProducts(data || []);
  }

  // Ajouter ou modifier un produit
  async function saveProduct() {
    if (!form.name || !form.price) return alert("Nom et prix requis !");
    if (editingId) {
      await supabase.from("products").update(form).eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("products").insert([form]);
    }
    setForm({ name: "", description: "", price: 0, image_url: "" });
    fetchProducts();
  }

  // Supprimer un produit
  async function deleteProduct(id: number) {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  // Remplir le formulaire pour édition
  function editProduct(p: Product) {
    setForm(p);
    setEditingId(p.id);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin — Gestion des produits</h1>

      <div className="max-w-xl mx-auto mb-8 bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Modifier le produit" : "Ajouter un produit"}</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Nom"
            className="border w-full p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Prix"
            className="border w-full p-2 rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
          />
          <input
            type="text"
            placeholder="URL image"
            className="border w-full p-2 rounded"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border w-full p-2 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button
            onClick={saveProduct}
            className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
          >
            {editingId ? "Mettre à jour" : "Ajouter"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Produits</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 text-left">
              <th className="p-2">Nom</th>
              <th className="p-2">Prix</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.price} DH</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => editProduct(p)} className="text-blue-500">✏️</button>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-500">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
