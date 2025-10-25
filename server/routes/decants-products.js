import express from "express";
import multer from "multer";
import DecantProduct from "../models/DecantProduct.js";
import path from "path";

const router = express.Router();

// 📦 Configuration upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// 🔹 GET — Tous les décants
router.get("/", async (req, res) => {
  try {
    const products = await DecantProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch {
    res.status(500).json({ error: "Erreur lors du chargement des décants" });
  }
});

// 🔹 POST — Ajouter un décant
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const prices = req.body.prices ? JSON.parse(req.body.prices) : [];
    const images = req.files.map((f) => `/uploads/${f.filename}`);

    const product = await DecantProduct.create({
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      notes: req.body.notes,
      prices,
      images,
    });

    res.status(201).json(product);
  } catch {
    res.status(400).json({ error: "Erreur lors de l’ajout" });
  }
});

// 🔹 PUT — Modifier un décant
router.put("/:id", upload.array("images"), async (req, res) => {
  try {
    const prices = req.body.prices ? JSON.parse(req.body.prices) : [];
    const images = req.files.map((f) => `/uploads/${f.filename}`);

    const updated = await DecantProduct.findByIdAndUpdate(
      req.params.id,
      { ...req.body, prices, $push: { images: { $each: images } } },
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(400).json({ error: "Erreur de mise à jour" });
  }
});

// 🔹 DELETE — Supprimer
router.delete("/:id", async (req, res) => {
  try {
    await DecantProduct.findByIdAndDelete(req.params.id);
    res.json({ message: "Décant supprimé" });
  } catch {
    res.status(400).json({ error: "Erreur lors de la suppression" });
  }
});

export default router;
