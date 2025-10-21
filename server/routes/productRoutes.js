import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// === ⚙️ CONFIGURATION MULTER ===
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Format de fichier non supporté"));
  },
});

// === 📦 RÉCUPÉRER TOUS LES PRODUITS ===
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du chargement des produits" });
  }
});

// === 📦 RÉCUPÉRER UN PRODUIT PAR ID ===
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit introuvable" });
    res.json(product);
  } catch {
    res.status(500).json({ message: "Erreur lors de la récupération du produit" });
  }
});

// === ➕ AJOUTER UN PRODUIT (ADMIN) ===
router.post("/", protect, upload.array("images", 8), async (req, res) => {
  try {
    const { name, description, type, notes, prices } = req.body;

    // Validation
    if (!name || !prices) return res.status(400).json({ message: "Champs manquants" });

    const parsedPrices = JSON.parse(prices); // [{volume: 50, amount: 200}, ...]

    const imagePaths = req.files.map((f) => `/uploads/${f.filename}`);

    const newProduct = await Product.create({
      name,
      description,
      type,
      notes,
      prices: parsedPrices,
      images: imagePaths,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Erreur ajout produit :", error);
    res.status(500).json({ message: "Erreur lors de l’ajout du produit", error: error.message });
  }
});

// === ✏️ MODIFIER PRODUIT ===
router.put("/:id", protect, upload.array("images", 8), async (req, res) => {
  try {
    const { name, description, type, notes, prices } = req.body;
    const parsedPrices = prices ? JSON.parse(prices) : [];

    const updatedFields = { name, description, type, notes, prices: parsedPrices };

    if (req.files.length > 0) {
      updatedFields.images = req.files.map((f) => `/uploads/${f.filename}`);
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erreur de mise à jour du produit" });
  }
});

// === ❌ SUPPRIMER PRODUIT ===
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit introuvable" });

    // Supprimer les fichiers images
    product.images.forEach((img) => {
      const filePath = path.join(process.cwd(), img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await product.deleteOne();
    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression produit" });
  }
});

export default router;
