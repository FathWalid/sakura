import express from "express";
import multer from "multer";
import Banner from "../models/Banner.js";

const router = express.Router();

// ⚙️ Config upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// ======================================================
// 🔹 GET — récupérer les bannières
// ======================================================
router.get("/", async (req, res) => {
  try {
    // 🧠 si ?all=true → on renvoie tout (pour admin)
    // sinon → uniquement les actives (pour le site public)
    const filter = req.query.all === "true" ? {} : { active: true };
    const banners = await Banner.find(filter).sort({ createdAt: -1 });
    res.json(banners);
  } catch {
    res.status(500).json({ error: "Erreur lors du chargement des bannières" });
  }
});

// ======================================================
// 🔹 POST — ajouter une bannière
// ======================================================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const banner = await Banner.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      link: req.body.link,
      image: `/uploads/${req.file.filename}`,
      active: req.body.active !== "false",
    });
    res.status(201).json(banner);
  } catch (err) {
    console.error("❌ Erreur ajout bannière :", err);
    res.status(400).json({ error: "Erreur lors de l’ajout de la bannière" });
  }
});

// ======================================================
// 🔹 PUT — activer/désactiver une bannière
// ======================================================
router.put("/:id/toggle", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: "Bannière introuvable" });

    banner.active = !banner.active;
    await banner.save();

    res.json(banner);
  } catch (err) {
    console.error("❌ Erreur toggle bannière :", err);
    res.status(400).json({ error: "Erreur lors du changement d’état" });
  }
});

// ======================================================
// 🔹 DELETE — supprimer une bannière
// ======================================================
router.delete("/:id", async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: "Bannière supprimée avec succès" });
  } catch {
    res.status(400).json({ error: "Erreur lors de la suppression" });
  }
});

export default router;
