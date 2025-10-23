import { useEffect, useState, useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { DashboardLayout } from "../../components/admin/DashboardLayout";
import { motion } from "framer-motion";
import {
  BarChart3,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import toast from "react-hot-toast";

export function AdminHome() {
  const { logout } = useContext(AdminAuthContext);
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const API = import.meta.env.VITE_API_URL;

  // 🔹 Charger les statistiques
  const fetchStats = async () => {
    try {
      const res = await fetch(`${API}/api/admin/stats`);
      const data = await res.json();
      setStats(data);
    } catch {
      toast.error("Erreur de chargement des statistiques");
    }
  };

  // 🔹 Charger les 5 dernières commandes
  const fetchRecentOrders = async () => {
    try {
      const res = await fetch(`${API}/api/orders?limit=5`);
      const data = await res.json();
      setRecentOrders(data);
    } catch (err) {
      console.error("Erreur chargement commandes :", err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
  }, []);

  const COLORS = ["#ec4899", "#facc15", "#22c55e"];
  const growthPositive = stats?.revenueGrowth?.growthRate >= 0;

  if (!stats)
    return (
      <DashboardLayout onLogout={logout}>
        <p>Chargement des statistiques...</p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout onLogout={logout}>
      <h1 className="text-3xl font-serif text-pink-600 mb-8">📊 Tableau de bord</h1>

      {/* 🌸 Cartes Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={<ShoppingBag />}
          color="pink"
          label="Commandes totales"
          value={stats.totalOrders}
        />
        <StatCard
          icon={<DollarSign />}
          color="yellow"
          label="Revenus totaux"
          value={`${stats.totalRevenue} MAD`}
        />
        <StatCard
          icon={<Package />}
          color="green"
          label="Produits actifs"
          value={stats.totalProducts}
        />
        <StatCard
          icon={<BarChart3 />}
          color="teal"
          label="Clients uniques"
          value={stats.totalClients}
        />
      </div>

      {/* 💹 Croissance du chiffre d’affaires */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-10 flex items-center justify-between bg-white shadow rounded-xl p-6 border-l-4 ${
          growthPositive ? "border-green-500" : "border-red-500"
        }`}
      >
        <div>
          <h3 className="text-gray-500 text-sm uppercase mb-1">
            Croissance du revenu (mois courant)
          </h3>
          <p className="text-3xl font-bold text-gray-800">
            {stats.revenueGrowth.current.toFixed(0)} MAD{" "}
            <span
              className={`ml-2 text-sm ${
                growthPositive ? "text-green-600" : "text-red-600"
              } font-semibold flex items-center`}
            >
              {growthPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {stats.revenueGrowth.growthRate.toFixed(1)}%
            </span>
          </p>
          <p className="text-xs text-gray-400">
            (Mois précédent : {stats.revenueGrowth.previous.toFixed(0)} MAD)
          </p>
        </div>
      </motion.div>

      {/* 📈 Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Revenus mensuels */}
        <ChartCard title="Revenus mensuels (MAD)">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.monthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#ec4899"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Statuts commandes */}
        <ChartCard title="Répartition des statuts de commandes">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.ordersStatus}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {stats.ordersStatus.map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 🧾 Dernières commandes + Top 5 produits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dernières commandes */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold text-pink-600 mb-4">
            🧾 Dernières commandes
          </h3>
          <ul className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <li
                key={order._id}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.customerEmail} • {order.total} MAD
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    order.status === "Confirmée"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Rejetée"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </li>
            ))}
            {recentOrders.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                Aucune commande récente.
              </p>
            )}
          </ul>
        </div>

        {/* 🏆 Top 5 produits les plus vendus (design amélioré) */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold text-pink-600 mb-4">
            🏆 Top 5 produits les plus vendus
          </h3>

          {stats.topProducts && stats.topProducts.length > 0 ? (
            <div className="space-y-4">
              {stats.topProducts.map((prod: any, i: number) => {
                const colors = ["#ec4899", "#f472b6", "#f9a8d4", "#fb7185", "#f43f5e"];
                const barColor = colors[i % colors.length];
                const width = Math.min(
                  100,
                  (prod.totalSales / stats.topProducts[0].totalSales) * 100
                );

                return (
                  <motion.div
                    key={prod.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between text-sm font-medium text-gray-600">
                      <span>{prod.name}</span>
                      <span className="text-gray-500">
                        {prod.totalSales.toFixed(0)} MAD
                      </span>
                    </div>

                    <div className="w-full bg-pink-100 rounded-full h-3 relative overflow-hidden">
                      <motion.div
                        className="h-3 rounded-full"
                        style={{
                          width: `${width}%`,
                          background: `linear-gradient(90deg, ${barColor}, #fff0f7)`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              Aucune vente enregistrée pour le moment.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* 🌸 Composants utilitaires */
function StatCard({ icon, color, label, value }: any) {
  const colors: any = {
    pink: "border-pink-500 text-pink-600",
    yellow: "border-yellow-400 text-yellow-500",
    green: "border-green-500 text-green-600",
    teal: "border-teal-500 text-teal-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white shadow rounded-xl p-5 border-l-4 ${colors[color]} flex items-center gap-4`}
    >
      <div className={`${colors[color]} text-3xl`}>{icon}</div>
      <div>
        <h3 className="text-gray-500 text-sm uppercase">{label}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
}

function ChartCard({ title, children }: any) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-lg font-semibold text-pink-600 mb-4">{title}</h3>
      {children}
    </div>
  );
}
