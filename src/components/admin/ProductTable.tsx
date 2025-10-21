export function ProductTable({ products, onDelete }: { products: any[]; onDelete: (id: string) => void }) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {products.map((p) => (
        <div key={p._id} className="bg-white rounded-xl shadow p-3 relative">
          <div className="flex gap-2 overflow-x-auto">
            {p.images?.map((img: string, i: number) => (
              <img
                key={i}
                src={`${import.meta.env.VITE_API_URL}${img}`}
                alt={p.name}
                className="w-20 h-20 object-cover rounded-md"
              />
            ))}
          </div>
          <h3 className="text-lg font-semibold text-pink-600 mt-2">{p.name}</h3>
          <p className="text-sm text-gray-600">{p.type}</p>
          <p className="text-sm text-gray-500">{p.notes}</p>
          <p className="text-gray-800 font-bold mt-2">{p.price} MAD</p>
          <button
            onClick={() => onDelete(p._id)}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}
