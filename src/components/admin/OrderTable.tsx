export function OrderTable({ orders }: { orders: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <div key={order._id} className="bg-white rounded-xl shadow p-3">
          <h3 className="text-lg font-semibold text-pink-600">{order.name}</h3>
          <p className="text-sm text-gray-600">{order.email}</p>
          <p className="text-sm text-gray-500">{order.phone}</p>
          <p className="text-gray-800 font-bold">{order.price} MAD</p>
          <div className="flex gap-2 mt-2">
            <button className="bg-green-500 text-white px-3 py-1 rounded-lg">
              Confirmer
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
              Rejeter
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
