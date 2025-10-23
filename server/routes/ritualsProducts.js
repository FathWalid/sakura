import express from "express";
import multer from "multer";
import RitualsProduct from "../models/RitualsProduct.js";
import path from "path";

const router = express.Router();

// ======================================================
// 📦 CONFIGURATION MULTER POUR UPLOAD D'IMAGES
// ======================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// ======================================================
// 🔹 GET — Tous les produits Rituals
// ======================================================
router.get("/", async (req, res) => {
  try {
    const products = await RitualsProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors du chargement des produits Rituals" });
  }
});

// ======================================================
// 🔹 GET — Un seul produit Rituals
// ======================================================
router.get("/:id", async (req, res) => {
  try {
    const product = await RitualsProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Produit non trouvé" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ======================================================
// 🔹 POST — Ajouter un produit Rituals (avec images et tailles)
// ======================================================
router.post("/", upload.array("images"), async (req, res) => {
  try {
    console.log("🧾 Body reçu Rituals:", req.body);

    // 🔸 Parse les tailles/prix envoyés
    const prices = req.body.prices ? JSON.parse(req.body.prices) : [];

    // 🔸 Crée les chemins des images uploadées
    const images = req.files.map((f) => `/uploads/${f.filename}`);

    const newProduct = new RitualsProduct({
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      notes: req.body.notes,
      prices,
      images,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Erreur ajout produit Rituals:", err);
    res.status(400).json({ error: "Erreur lors de l'ajout du produit Rituals" });
  }
});

// ======================================================
// 🔹 PUT — Modifier un produit Rituals
// ======================================================
router.put("/:id", upload.array("images"), async (req, res) => {
  try {
    const prices = req.body.prices ? JSON.parse(req.body.prices) : [];
    const images = req.files.map((f) => `/uploads/${f.filename}`);

    const updated = await RitualsProduct.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        prices,
        $push: { images: { $each: images } },
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("❌ Erreur mise à jour produit Rituals:", err);
    res.status(400).json({ error: "Erreur lors de la mise à jour" });
  }
});

// ======================================================
// 🔹 DELETE — Supprimer un produit Rituals
// ======================================================
router.delete("/:id", async (req, res) => {
  try {
    await RitualsProduct.findByIdAndDelete(req.params.id);
    res.json({ message: "Produit Rituals supprimé avec succès" });
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la suppression" });
  }
});

export default router;
