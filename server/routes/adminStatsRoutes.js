import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import ZaraProduct from "../models/ZaraProduct.js";
import RitualsProduct from "../models/RitualsProduct.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    // === 1️⃣ Totaux ===
    const totalOrders = await Order.countDocuments();
    const totalProducts =
      (await Product.countDocuments()) +
      (await ZaraProduct.countDocuments()) +
      (await RitualsProduct.countDocuments());
    const totalClients = await Order.distinct("customerEmail").then((arr) => arr.length);

    // === 2️⃣ Revenu total ===
    const confirmedOrders = await Order.find({ status: "Confirmée" });
    const totalRevenue = confirmedOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    // === 3️⃣ Revenus mensuels ===
    const monthlyRevenueRaw = await Order.aggregate([
      { $match: { status: "Confirmée" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          amount: { $sum: "$total" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const monthNames = [
      "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
      "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
    ];

    const monthlyRevenue = monthlyRevenueRaw.map((m) => ({
      month: monthNames[m._id - 1],
      amount: m.amount,
    }));

    // === 4️⃣ Top 5 produits les plus vendus ===
    const topProductsRaw = await Order.aggregate([
      { $match: { status: "Confirmée" } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalSales: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
          totalQty: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 },
    ]);

    const topProducts = topProductsRaw.map((p) => ({
      name: p._id,
      totalSales: p.totalSales,
      totalQty: p.totalQty,
    }));

    // === 5️⃣ Répartition des statuts de commandes ===
    const statusCounts = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const ordersStatus = statusCounts.map((s) => ({
      status: s._id,
      count: s.count,
    }));

    // === 6️⃣ Croissance du chiffre d’affaires ===
    const currentMonth = new Date().getMonth() + 1;
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;

    const revenueComparison = await Order.aggregate([
      { $match: { status: "Confirmée" } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          total: { $sum: "$total" },
        },
      },
    ]);

    const current = revenueComparison.find((r) => r._id.month === currentMonth)?.total || 0;
    const previous = revenueComparison.find((r) => r._id.month === prevMonth)?.total || 0;
    const growthRate = previous === 0 ? 100 : ((current - previous) / previous) * 100;

    // === 7️⃣ Réponse finale ===
    res.json({
      totalOrders,
      totalRevenue,
      totalProducts,
      totalClients,
      monthlyRevenue,
      topProducts,
      ordersStatus,
      revenueGrowth: { current, previous, growthRate },
    });
  } catch (err) {
    console.error("Erreur stats admin :", err);
    res.status(500).json({ error: "Erreur serveur lors du calcul des statistiques" });
  }
});

export default router;
