import { useContext, useEffect, useState } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { DashboardLayout } from "../../components/admin/DashboardLayout";
import toast from "react-hot-toast";

export function AdminOrders() {
  const { token, logout } = useContext(AdminAuthContext);
  const [orders, setOrders] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/api/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API}/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success(`Commande ${status.toLowerCase()} 🌸`);
        fetchOrders();
      } else toast.error("Erreur de mise à jour !");
    } catch {
      toast.error("Erreur serveur");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Supprimer cette commande ?")) return;
    await fetch(`${API}/api/orders/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <DashboardLayout onLogout={logout}>
      <h1 className="text-3xl font-semibold text-pink-600 mb-6">
        🌸 Gestion des Commandes
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">Aucune commande pour le moment.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow p-6 border border-pink-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-pink-600">
                    {order.customerName}
                  </h3>
                  <p className="text-sm text-gray-600">{order.customerEmail}</p>
                  <p className="text-sm text-gray-500">{order.customerPhone}</p>

                  <div className="mt-3 space-y-1">
                    {order.items.map((item: any, idx: number) => (
                      <p
                        key={idx}
                        className="text-sm text-gray-700 flex justify-between"
                      >
                        <span>
                          {item.name} — {item.volume}ml × {item.quantity}   

                        </span>
                      </p>
                    ))}
                  </div>

                  <p className="font-bold mt-3 text-teal-dark">
                    Total : {order.total} MAD
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "Confirmée"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Rejetée"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>

                  <div className="flex flex-col gap-2 mt-3">
                    <button
                      onClick={() => updateStatus(order._id, "Confirmée")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Confirmer
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "Rejetée")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Rejeter
                    </button>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
