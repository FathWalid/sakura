interface ProductTableProps {
  products: any[];
  onDelete: (id: string) => void;
  onEdit: (product: any) => void;
}

export function ProductTable({ products, onDelete, onEdit }: ProductTableProps) {
  const API = import.meta.env.VITE_API_URL;

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white rounded-xl shadow p-3 relative hover:shadow-lg transition"
        >
          <div className="flex gap-2 overflow-x-auto">
            {p.images?.map((img: string, i: number) => (
              <img
                key={i}
                src={`${API}${img}`}
                alt={p.name}
                className="w-20 h-20 object-cover rounded-md"
              />
            ))}
          </div>

          <h3 className="text-lg font-semibold text-pink-600 mt-2">{p.name}</h3>
          <p className="text-sm text-gray-600">{p.type}</p>
          <p className="text-sm text-gray-500">{p.notes}</p>

          {p.prices?.length > 0 && (
            <p className="text-gray-800 font-bold mt-2 text-sm">
              {p.prices
                .map((x: any) => {
                  const key = x.size || x.volume;
                  return `${key}: ${x.amount} MAD`;
                })
                .join(" / ")}
            </p>
          )}

          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={() => onEdit(p)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
              title="Modifier"
            >
              ✏️
            </button>

            <button
              onClick={() => onDelete(p._id)}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
              title="Supprimer"
            >
              ✖
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
