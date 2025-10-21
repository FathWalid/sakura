import express from "express";
import Order from "../models/Order.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// 🌸 Configuration SMTP (Office365)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { ciphers: "SSLv3" },
});

// 📦 Créer une commande (depuis le site)
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error("Erreur création commande :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 📜 Lister toutes les commandes pour l’admin
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Erreur chargement commandes :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✏️ Mettre à jour le statut et envoyer un mail
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Commande introuvable" });

    order.status = status;
    await order.save();

    // 📨 Email au client
    const subject =
      status === "Confirmée"
        ? "🌸 Votre commande Sakura Essence est confirmée !"
        : "❌ Votre commande Sakura Essence a été rejetée";

    const itemsHtml = order.items
      .map(
        (i) =>
          `<li>${i.name} — ${i.volume}ml × ${i.quantity} = ${
            i.price * i.quantity
          } MAD</li>`
      )
      .join("");

    const html =
      status === "Confirmée"
        ? `
      <div style="font-family:'Poppins',sans-serif;background:#fff6f8;padding:20px;border-radius:10px;border:1px solid #f3d7e0;">
        <h2 style="color:#0f766e;">Merci ${order.customerName} 💐</h2>
        <p>Votre commande a été <strong>confirmée</strong> avec succès !</p>
        <p>Détails de votre commande :</p>
        <ul>${itemsHtml}</ul>
        <p><strong>Total :</strong> ${order.total} MAD</p>
        <p>Nous vous contacterons très bientôt pour la livraison 🌸</p>
        <br/>
        <p style="color:#888;">L’équipe <strong>Sakura Essence</strong></p>
      </div>
    `
        : `
      <div style="font-family:'Poppins',sans-serif;background:#fff6f8;padding:20px;border-radius:10px;border:1px solid #f3d7e0;">
        <h2 style="color:#b91c1c;">Bonjour ${order.customerName}</h2>
        <p>Nous sommes désolés 😔, mais votre commande a été <strong>rejetée</strong>.</p>
        <p>Pour plus d’informations, vous pouvez nous contacter sur WhatsApp ou par email.</p>
        <br/>
        <p style="color:#888;">L’équipe <strong>Sakura Essence</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Sakura Essence" <${process.env.SMTP_USER}>`,
      to: order.customerEmail,
      subject,
      html,
    });

    res.json({ message: `Commande ${status.toLowerCase()} et email envoyé ✅` });
  } catch (error) {
    console.error("Erreur update statut :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ❌ Supprimer une commande
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Commande supprimée ✅" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression" });
  }
});

export default router;
