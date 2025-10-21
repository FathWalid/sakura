import { useState } from "react";

export function ProductForm({ onAdd }: { onAdd: (data: FormData) => void }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    notes: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [prices, setPrices] = useState([{ volume: 50, amount: 0 }]);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e: any) => setImages([...e.target.files]);

  const handlePriceChange = (
  index: number,
  field: "volume" | "amount",
  value: string
    ) => {
      const newPrices = [...prices];
      newPrices[index][field] = Number(value);
      setPrices(newPrices);
    };


  const addVolumeField = () => setPrices([...prices, { volume: 0, amount: 0 }]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    data.append("prices", JSON.stringify(prices));
    images.forEach((img) => data.append("images", img));
    onAdd(data);
    setForm({ name: "", description: "", type: "", notes: "" });
    setPrices([{ volume: 50, amount: 0 }]);
    setImages([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md grid gap-3">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="border p-2 rounded" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" required />
      <input name="type" value={form.type} onChange={handleChange} placeholder="Type" className="border p-2 rounded" />
      <input name="notes" value={form.notes} onChange={handleChange} placeholder="Genre (Homme/Femme/Unisexe)" className="border p-2 rounded" />

      <div className="border rounded p-3">
        <h3 className="font-semibold mb-2">Prix par volume (ml)</h3>
        {prices.map((p, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input type="number" value={p.volume} onChange={(e) => handlePriceChange(i, "volume", e.target.value)} className="border p-2 rounded w-1/2" placeholder="Volume (ml)" />
            <input type="number" value={p.amount} onChange={(e) => handlePriceChange(i, "amount", e.target.value)} className="border p-2 rounded w-1/2" placeholder="Prix (MAD)" />
          </div>
        ))}
        <button type="button" onClick={addVolumeField} className="text-pink-600 text-sm hover:underline">
          + Ajouter un volume
        </button>
      </div>

      <input type="file" multiple accept="image/*" onChange={handleImageChange} className="border p-2 rounded" />

      <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold">
        ➕ Ajouter le produit
      </button>
    </form>
  );
}
