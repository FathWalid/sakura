import { useEffect, useState } from "react";

interface ProductFormProps {
  onAdd?: (data: FormData) => void;
  onUpdate?: (data: FormData) => void;
  editingProduct?: any;
  mode?: "default" | "rituals";
}

export function ProductForm({
  onAdd,
  onUpdate,
  editingProduct,
  mode = "default",
}: ProductFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    notes: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [prices, setPrices] = useState<any[]>(
    mode === "rituals"
      ? [{ size: "S", amount: 0 }]
      : [{ volume: 50, amount: 0 }]
  );

  // 🧩 Pré-remplir le formulaire si on édite un produit
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        type: editingProduct.type || "",
        notes: editingProduct.notes || "",
      });
      setPrices(editingProduct.prices || []);
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setForm({ name: "", description: "", type: "", notes: "" });
    setPrices(
      mode === "rituals"
        ? [{ size: "S", amount: 0 }]
        : [{ volume: 50, amount: 0 }]
    );
    setImages([]);
  };

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e: any) => setImages([...e.target.files]);

  const handlePriceChange = (index: number, field: string, value: any) => {
    const newPrices = [...prices];
    newPrices[index][field] = field === "amount" ? Number(value) : value;
    setPrices(newPrices);
  };

  const addPriceField = () => {
    setPrices([
      ...prices,
      mode === "rituals"
        ? { size: "S", amount: 0 }
        : { volume: 50, amount: 0 },
    ]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append("prices", JSON.stringify(prices));

    // 🔹 N’ajoute que si l’utilisateur a choisi des images
    if (images && images.length > 0) {
      images.forEach((img) => data.append("images", img));
    }

    if (editingProduct) {
      onUpdate?.(data);
    } else {
      onAdd?.(data);
    }

    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md grid gap-3"
    >
      <h2 className="text-xl font-semibold text-pink-600 mb-2">
        {editingProduct ? "✏️ Modifier le produit" : "➕ Ajouter un produit"}
      </h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nom du parfum"
        className="border p-2 rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 rounded"
        required
      />
      <input
        name="type"
        value={form.type}
        onChange={handleChange}
        placeholder="Type (ex: Eau de Parfum)"
        className="border p-2 rounded"
      />

      {/* 🌸 Sélecteur de genre */}
      <select
        name="notes"
        value={form.notes}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="">-- Sélectionner le genre --</option>
        <option value="Homme">Homme</option>
        <option value="Femme">Femme</option>
        <option value="Unisexe">Unisexe</option>
      </select>

      {/* 💰 Prix dynamiques */}
      <div className="border rounded p-3">
        <h3 className="font-semibold mb-2">
          {mode === "rituals" ? "Prix par taille" : "Prix par volume (ml)"}
        </h3>
        {prices.map((p, i) => (
          <div key={i} className="flex gap-2 mb-2">
            {mode === "rituals" ? (
              <select
                value={p.size}
                onChange={(e) =>
                  handlePriceChange(i, "size", e.target.value)
                }
                className="border p-2 rounded w-1/2"
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            ) : (
              <input
                type="number"
                value={p.volume}
                onChange={(e) =>
                  handlePriceChange(i, "volume", e.target.value)
                }
                className="border p-2 rounded w-1/2"
                placeholder="Volume (ml)"
              />
            )}

            <input
              type="number"
              value={p.amount}
              onChange={(e) =>
                handlePriceChange(i, "amount", e.target.value)
              }
              className="border p-2 rounded w-1/2"
              placeholder="Prix (MAD)"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addPriceField}
          className="text-pink-600 text-sm hover:underline"
        >
          + Ajouter un {mode === "rituals" ? "format" : "volume"}
        </button>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 rounded"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className={`${
            editingProduct
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-pink-600 hover:bg-pink-700"
          } text-white py-2 px-4 rounded font-semibold`}
        >
          {editingProduct ? "💾 Enregistrer les modifications" : "➕ Ajouter le produit"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          >
            ❌ Annuler
          </button>
        )}
      </div>
    </form>
  );
}
