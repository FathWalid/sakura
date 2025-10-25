import express from "express";
import multer from "multer";
import ZaraProduct from "../models/ZaraProduct.js";
import path from "path";

const router = express.Router();

// ⚙️ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// ======================================================
// 🔹 GET — Tous les produits Zara
// ======================================================
router.get("/", async (req, res) => {
  try {
    const products = await ZaraProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors du chargement des produits Zara" });
  }
});

// ======================================================
// 🔹 GET — Un seul produit
// ======================================================
router.get("/:id", async (req, res) => {
  try {
    const product = await ZaraProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Produit non trouvé" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ======================================================
// 🔹 POST — Ajouter un produit
// ======================================================
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const prices = req.body.prices ? JSON.parse(req.body.prices) : [];
    const images = req.files.map((f) => `/uploads/${f.filename}`);

    const product = new ZaraProduct({
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      notes: req.body.notes,
      prices,
      images,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Erreur ajout produit Zara:", err);
    res.status(400).json({ error: "Erreur lors de l'ajout du produit Zara" });
  }
});

// ======================================================
// 🔹 PUT — Modifier un produit (garde anciennes images si non remplacées)
// ======================================================
router.put("/:id", upload.array("images"), async (req, res) => {
  try {
    const prices = req.body.prices ? JSON.parse(req.body.prices) : [];
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      notes: req.body.notes,
      prices,
    };

    // 🔹 Ne change les images que si de nouvelles sont uploadées
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((f) => `/uploads/${f.filename}`);
    }

    const updated = await ZaraProduct.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    console.error("❌ Erreur mise à jour Zara:", err);
    res.status(400).json({ error: "Erreur lors de la mise à jour" });
  }
});

// ======================================================
// 🔹 DELETE — Supprimer un produit Zara
// ======================================================
router.delete("/:id", async (req, res) => {
  try {
    await ZaraProduct.findByIdAndDelete(req.params.id);
    res.json({ message: "Produit Zara supprimé avec succès" });
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la suppression" });
  }
});

export default router;
