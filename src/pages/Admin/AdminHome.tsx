import { useEffect, useState, useContext } from "react";
import { DashboardLayout } from "../../components/admin/DashboardLayout";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

export function AdminHome() {
  const { token, logout } = useContext(AdminAuthContext);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    confirmed: 0,
    rejected: 0,
  });
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, orderRes] = await Promise.all([
          fetch(`${API}/api/products`),
          fetch(`${API}/api/orders`),
        ]);

        const products = await prodRes.json();
        const orders = await orderRes.json();

        setStats({
          products: products.length,
          orders: orders.length,
          confirmed: orders.filter((x: any) => x.status === "Confirmée").length,
          rejected: orders.filter((x: any) => x.status === "Rejetée").length,
        });
      } catch (error) {
        console.error("Erreur chargement stats :", error);
      }
    };

    fetchStats();
  }, [token]);

  const chartData = {
    labels: ["Confirmées", "Rejetées", "En attente"],
    datasets: [
      {
        data: [
          stats.confirmed,
          stats.rejected,
          stats.orders - (stats.confirmed + stats.rejected),
        ],
        backgroundColor: ["#0f766e", "#e11d48", "#fbbf24"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardLayout onLogout={logout}>
      <h1 className="text-3xl font-semibold text-pink-600 mb-10">
        🌸 Tableau de bord global
      </h1>

      {/* Cartes de stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white shadow-md rounded-xl p-6 text-center border border-pink-100">
          <h3 className="text-gray-600 text-sm">Produits</h3>
          <p className="text-4xl font-bold text-pink-600 mt-2">
            {stats.products}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center border border-pink-100">
          <h3 className="text-gray-600 text-sm">Commandes</h3>
          <p className="text-4xl font-bold text-pink-600 mt-2">
            {stats.orders}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center border border-pink-100">
          <h3 className="text-gray-600 text-sm">Confirmées</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {stats.confirmed}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center border border-pink-100">
          <h3 className="text-gray-600 text-sm">Rejetées</h3>
          <p className="text-4xl font-bold text-red-600 mt-2">
            {stats.rejected}
          </p>
        </div>
      </div>

      {/* Graphique en donut */}
      <div className="bg-white rounded-xl shadow-md border border-pink-100 p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold text-teal-dark mb-4 text-center">
          Répartition des commandes
        </h2>
        <Doughnut data={chartData} />
      </div>
    </DashboardLayout>
  );
}
