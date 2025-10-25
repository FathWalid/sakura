import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DashboardLayout } from "../../components/admin/DashboardLayout";

export function AdminBanner() {
  const API = import.meta.env.VITE_API_URL;
  const [banners, setBanners] = useState<any[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [form, setForm] = useState({ title: "", subtitle: "", link: "" });

  // 🧩 Charger les bannières
  const fetchBanners = async () => {
    const res = await fetch(`${API}/api/banners?all=true`);
    const data = await res.json();
    setBanners(data);
  };

  // ➕ Ajouter une bannière
  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (!image) return toast.error("Ajoute une image !");
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append("image", image);

    const res = await fetch(`${API}/api/banners`, { method: "POST", body: data });
    if (res.ok) {
      toast.success("Bannière ajoutée !");
      fetchBanners();
      setForm({ title: "", subtitle: "", link: "" });
      setImage(null);
    } else toast.error("Erreur !");
  };

  // 🔄 Activer/Désactiver
  const toggleActive = async (id: string) => {
    try {
      const res = await fetch(`${API}/api/banners/${id}/toggle`, { method: "PUT" });
      if (!res.ok) throw new Error();
      fetchBanners();
    } catch {
      toast.error("Erreur lors du changement d’état");
    }
  };

  // 🗑️ Supprimer
  const deleteBanner = async (id: string) => {
    if (!confirm("Supprimer cette bannière ?")) return;
    await fetch(`${API}/api/banners/${id}`, { method: "DELETE" });
    toast.success("Supprimée !");
    fetchBanners();
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <DashboardLayout onLogout={() => localStorage.removeItem("adminToken")}>
      <h1 className="text-3xl font-serif text-pink-600 mb-6">
        🖼️ Gestion des Bannières / Animations
      </h1>

      {/* 🧾 Formulaire d'ajout */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-xl shadow-md grid gap-3 mb-8"
      >
        <input
          name="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Titre (ex : -10% sur tout)"
          className="border p-2 rounded"
        />
        <input
          name="subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          placeholder="Sous-titre ou message promo"
          className="border p-2 rounded"
        />
        <input
          name="link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          placeholder="Lien (optionnel)"
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold"
        >
          ➕ Ajouter la bannière
        </button>
      </form>

      {/* 🖼️ Liste des bannières */}
      <div className="grid md:grid-cols-3 gap-6">
        {banners.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-xl shadow p-3 relative hover:shadow-lg transition"
          >
            <img
              src={`${API}${b.image}`}
              alt={b.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-semibold text-pink-600 mt-2">{b.title}</h3>
            <p className="text-gray-600">{b.subtitle}</p>

            <div className="flex justify-between items-center mt-4">
              {/* ✅ Switch moderne */}
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={b.active}
                    onChange={() => toggleActive(b._id)}
                  />
                  <div
                    className={`block w-12 h-6 rounded-full transition ${
                      b.active ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      b.active ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium">
                  {b.active ? "Active" : "Inactive"}
                </span>
              </label>

              <button
                onClick={() => deleteBanner(b._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
