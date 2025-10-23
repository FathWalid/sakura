import { useEffect, useState, useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { DashboardLayout } from "../../components/admin/DashboardLayout";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Trash2, Search, Package } from "lucide-react";
import toast from "react-hot-toast";

export function AdminOrders() {
  const { token, logout } = useContext(AdminAuthContext);
  const [orders, setOrders] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  // 🔹 Charger les commandes
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/orders`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Format invalide");
      setOrders(data);
      setFiltered(data);
    } catch {
      toast.error("Erreur de chargement des commandes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔍 Filtrage dynamique
  useEffect(() => {
    let filteredList = [...orders];

    if (filterStatus !== "Tous") {
      filteredList = filteredList.filter(
        (o) => o.status?.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    if (search.trim()) {
      filteredList = filteredList.filter(
        (o) =>
          o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
          o.customerEmail?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(filteredList);
  }, [filterStatus, search, orders]);

  // ✅ Confirmer une commande
  const handleConfirm = async (id: string) => {
    try {
      const res = await fetch(`${API}/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Confirmée" }),
      });
      if (!res.ok) throw new Error();
      toast.success("Commande confirmée ✅ (email envoyé au client)");
      fetchOrders();
    } catch {
      toast.error("Erreur lors de la confirmation");
    }
  };

  // ❌ Rejeter une commande
  const handleReject = async (id: string) => {
    try {
      const res = await fetch(`${API}/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Rejetée" }),
      });
      if (!res.ok) throw new Error();
      toast.error("Commande rejetée ❌ (email envoyé au client)");
      fetchOrders();
    } catch {
      toast.error("Erreur lors du rejet");
    }
  };

  // 🗑️ Supprimer une commande
  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette commande ?")) return;
    try {
      const res = await fetch(`${API}/api/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      toast.success("Commande supprimée ✅");
      fetchOrders();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  // 📊 Compter les statuts
  const countByStatus = (status: string) =>
    orders.filter(
      (o) => o.status?.toLowerCase() === status.toLowerCase()
    ).length;

  return (
    <DashboardLayout onLogout={logout}>
      <h1 className="text-3xl font-serif text-pink-600 mb-8 flex items-center gap-3">
        <Package className="w-7 h-7 text-pink-500" />
        Gestion des Commandes
      </h1>

      {/* 📈 Statistiques */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatBox label="En attente" color="yellow" value={countByStatus("En attente")} />
        <StatBox label="Confirmées" color="green" value={countByStatus("Confirmée")} />
        <StatBox label="Rejetées" color="red" value={countByStatus("Rejetée")} />
      </div>

      {/* 🔎 Filtres et recherche */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          {["Tous", "En attente", "Confirmée", "Rejetée"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                filterStatus === status
                  ? "bg-pink-600 text-white shadow"
                  : "bg-white text-gray-700 border hover:bg-pink-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher client..."
            className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
      </div>

      {/* 📋 Liste des commandes */}
      {loading ? (
        <p className="text-center text-gray-500">Chargement des commandes...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-pink-600">
                  {order.customerName || "Client"}
                </h3>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                    order.status === "En attente"
                      ? "bg-yellow-100 text-yellow-600"
                      : order.status === "Confirmée"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-600">{order.customerEmail}</p>
              <p className="text-sm text-gray-600 mb-3">{order.customerPhone}</p>

              {/* 🧴 Détails produits */}
              <div className="text-sm text-gray-700 mt-3">
                {order.items && order.items.length > 0 ? (
                  <>
                    <p>
                      <span className="font-semibold">Produit :</span>{" "}
                      {order.items[0].name} ({order.items[0].volume}ml)
                    </p>
                    <p>
                      <span className="font-semibold">Quantité :</span>{" "}
                      {order.items[0].quantity}
                    </p>
                    <p>
                      <span className="font-semibold">Prix :</span>{" "}
                      <span className="text-pink-600 font-semibold">
                        {order.items[0].price} MAD
                      </span>
                    </p>
                  </>
                ) : (
                  <p>Aucun article</p>
                )}

                <p className="mt-2 font-bold text-teal-dark">
                  Total : {order.total} MAD
                </p>
              </div>

              {/* 🔘 Boutons actions */}
              <div className="flex gap-2 mt-5">
                {order.status === "En attente" ? (
                  <>
                    <button
                      onClick={() => handleConfirm(order._id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" /> Confirmer
                    </button>
                    <button
                      onClick={() => handleReject(order._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-4 h-4" /> Rejeter
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center justify-center gap-1 border border-gray-300"
                  >
                    <Trash2 className="w-4 h-4" /> Supprimer
                  </button>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && !loading && (
            <p className="text-center text-gray-500 col-span-full">
              Aucune commande trouvée.
            </p>
          )}
        </motion.div>
      )}
    </DashboardLayout>
  );
}

/* 🌸 Boîte statistique réutilisable */
function StatBox({ label, color, value }: any) {
  const colors: any = {
    yellow: "border-yellow-400 text-yellow-500",
    green: "border-green-500 text-green-600",
    red: "border-red-500 text-red-600",
  };

  return (
    <div
      className={`bg-white shadow rounded-xl p-5 border-l-4 ${colors[color]} flex flex-col`}
    >
      <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
      <p className={`text-3xl font-bold mt-1 ${colors[color].split(" ")[1]}`}>
        {value}
      </p>
    </div>
  );
}
