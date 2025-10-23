import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DashboardLayout } from "../../components/admin/DashboardLayout";

export function AdminRituals() {
  const API = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    notes: "",
  });
  const [prices, setPrices] = useState([{ size: "S", amount: 0 }]);
  const [images, setImages] = useState<File[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/api/rituals-products`);
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Erreur lors du chargement des produits Rituals");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    data.append("prices", JSON.stringify(prices));
    images.forEach((img) => data.append("images", img));

    try {
      const res = await fetch(`${API}/api/rituals-products`, {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error();
      toast.success("Produit Rituals ajouté !");
      fetchProducts();
      setForm({ name: "", description: "", type: "", notes: "" });
      setPrices([{ size: "S", amount: 0 }]);
      setImages([]);
    } catch {
      toast.error("Erreur lors de l’ajout du produit Rituals");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce produit Rituals ?")) return;
    try {
      await fetch(`${API}/api/rituals-products/${id}`, { method: "DELETE" });
      toast.success("Produit supprimé !");
      fetchProducts();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <DashboardLayout onLogout={() => localStorage.removeItem("adminToken")}>
      <div>
        <h1 className="text-3xl font-serif text-pink-600 mb-6">🪷 Gestion des Parfums Rituals</h1>

        <form
          onSubmit={handleAdd}
          className="bg-white p-6 rounded-xl shadow-md grid gap-3"
        >
          <input
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nom"
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="border p-2 rounded"
            required
          />
          <input
            name="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            placeholder="Type"
            className="border p-2 rounded"
          />
          <input
            name="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Genre (Homme/Femme/Unisexe)"
            className="border p-2 rounded"
          />

          <div className="border rounded p-3">
            <h3 className="font-semibold mb-2">Prix par taille</h3>
            {prices.map((p, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <select
                  value={p.size}
                  onChange={(e) => {
                    const newPrices = [...prices];
                    newPrices[i].size = e.target.value;
                    setPrices(newPrices);
                  }}
                  className="border p-2 rounded w-1/2"
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
                <input
                  type="number"
                  value={p.amount}
                  onChange={(e) => {
                    const newPrices = [...prices];
                    newPrices[i].amount = Number(e.target.value);
                    setPrices(newPrices);
                  }}
                  className="border p-2 rounded w-1/2"
                  placeholder="Prix (MAD)"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setPrices([...prices, { size: "S", amount: 0 }])}
              className="text-pink-600 text-sm hover:underline"
            >
              + Ajouter une taille
            </button>
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold"
          >
            ➕ Ajouter le produit
          </button>
        </form>

        {loading ? (
          <p className="text-gray-500 mt-6">Chargement...</p>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow p-3 relative"
              >
                <img
                  src={`${API}${p.images?.[0]}`}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold text-pink-600">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-600">{p.type}</p>
                <p className="text-gray-800 font-bold mt-2">
                  {p.prices?.map((x: any) => `${x.size}: ${x.amount} MAD`).join(" / ")}
                </p>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
