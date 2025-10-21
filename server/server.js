import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js"; // ✅ nouveau

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// 📁 Vérifie que le dossier uploads existe
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// 🌸 Routes principales
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes); // ✅ ajout route contact

// 🌸 Servir les fichiers images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur Sakura en ligne sur le port ${PORT}`));
