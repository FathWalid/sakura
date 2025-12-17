import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";

// 🌸 Routes principales
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// 🪷 Routes marques & statistiques
import zaraRoutes from "./routes/zaraProducts.js";
import ritualsRoutes from "./routes/ritualsProducts.js";
import adminStatsRoutes from "./routes/adminStatsRoutes.js";
import bannerRoutes from "./routes/banners.js";
import decantsRoutes from "./routes/decants-products.js";
// 🌿 Initialisation environnement & serveur
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// =====================================
// 🌍 Configuration CORS (Front autorisé)
// =====================================
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Front local dev
      "https://sakuraessence.com", // Domaine de prod
      "https://www.sakuraessence.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =====================================
// 📁 Gestion du dossier "uploads"
// =====================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log("📂 Dossier 'uploads' créé automatiquement.");
}

// =====================================
// 🌸 Déclaration des routes principales
// =====================================
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// =====================================
// 🪷 Routes pour Zara, Rituals & Stats
// =====================================
app.use("/api/zara-products", zaraRoutes);
app.use("/api/rituals-products", ritualsRoutes);
app.use("/api/admin", adminStatsRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/decants-products", decantsRoutes);

// =====================================
// 🖼️ Servir les fichiers d’images
// =====================================
app.use("/uploads", express.static(uploadPath));

// =====================================
// ✅ Route de test simple
// =====================================
app.get("/", (req, res) => {
  res.send("🌸 API Sakura Essence en ligne et opérationnelle !");
});

// =====================================
// 🚀 Lancement du serveur
// =====================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("--------------------------------------------------");
  console.log(`✅ Serveur Sakura Essence en ligne sur le port ${PORT}`);
  console.log(`📡 Environnement : ${process.env.NODE_ENV || "development"}`);
  console.log("--------------------------------------------------");
});
