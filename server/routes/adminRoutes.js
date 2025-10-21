import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// 📜 Connexion admin
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await User.findOne({ username });

  if (!admin) return res.status(401).json({ message: "Admin introuvable" });

  const match = await bcrypt.compare(password, admin.password);

  if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({ token });
});

export default router;
