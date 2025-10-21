import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
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

    // 🎨 Style email Sakura
    const emailTemplate = (title, content) => `
      <body style="margin:0;padding:0;font-family:'Poppins',Arial,sans-serif;background-color:#fdfaf7;">
        <div style="max-width:600px;margin:40px auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <div style="background-color:#0f766e;padding:20px 30px;text-align:center;color:#fff;">
            <h1 style="margin:0;font-size:28px;font-family:'Playfair Display',serif;">Sakura Essence</h1>
            <p style="margin:5px 0 0;font-size:14px;color:#cde5e1;">Parfums raffinés & élégance intemporelle</p>
          </div>
          
          <!-- Content -->
          <div style="padding:30px;color:#333;">
            <h2 style="color:#0f766e;font-size:20px;">${title}</h2>
            <div style="margin-top:15px;line-height:1.6;font-size:15px;color:#555;">
              ${content}
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color:#fae1dd;padding:20px;text-align:center;">
            <p style="margin:0;font-size:13px;color:#555;">
              🌸 Sakura Essence | Rabat, Maroc<br/>
              <a href="https://sakuraessence.com" style="color:#0f766e;text-decoration:none;font-weight:500;">sakuraessence.com</a>
            </p>
          </div>
        </div>
      </body>
    `;

    // 📦 Email admin (vers toi)
    const adminContent = `
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Sujet :</strong> ${subject || "Sans sujet"}</p>
      <p><strong>Message :</strong></p>
      <div style="background-color:#f9f9f9;padding:15px;border-radius:10px;margin-top:10px;border-left:4px solid #0f766e;">
        ${message.replace(/\n/g, "<br/>")}
      </div>
    `;

    const adminMail = {
      from: `"Sakura Essence" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📩 Nouveau message - ${subject || "Sans sujet"}`,
      html: emailTemplate("💌 Nouveau message reçu depuis le site", adminContent),
    };

    await transporter.sendMail(adminMail);

    // 💖 Email de confirmation pour le client
    const clientContent = `
      <p>Bonjour ${name},</p>
      <p>Merci de nous avoir contactés 🌸</p>
      <p>Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.</p>
      <div style="margin:20px 0;padding:15px;background-color:#fff6f8;border-radius:10px;border-left:4px solid #e6b8b8;">
        <p style="margin:0 0 5px 0;"><strong>Votre message :</strong></p>
        <p style="color:#555;">${message.replace(/\n/g, "<br/>")}</p>
      </div>
      <p>À très bientôt,</p>
      <p style="font-weight:600;color:#0f766e;">L’équipe Sakura Essence</p>
    `;

    const clientMail = {
      from: `"Sakura Essence" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🌸 Merci pour votre message - Sakura Essence",
      html: emailTemplate("Merci pour votre message 💐", clientContent),
    };

    await transporter.sendMail(clientMail);

    res.status(200).json({ message: "✅ Message envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur SMTP:", error);
    res.status(500).json({ message: "❌ Erreur d’envoi de l’email." });
  }
});

export default router;
