import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("🧠 Tentative de connexion :", { username, password });

  const admin = await User.findOne({ username });
  console.log("🔎 Utilisateur trouvé :", admin);

  if (!admin) {
    console.log("❌ Aucun utilisateur trouvé !");
    return res.status(401).json({ message: "Admin introuvable" });
  }

  const match = await bcrypt.compare(password, admin.password);
  console.log("🔑 Mot de passe correspond ?", match);

  if (!match) {
    console.log("❌ Mot de passe incorrect !");
    return res.status(401).json({ message: "Mot de passe incorrect" });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  console.log("✅ Connexion réussie !");
  res.json({ token });
});

export default router;
