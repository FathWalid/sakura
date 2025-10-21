// server/createAdmin.js
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

dotenv.config();
await connectDB();

const username = "walid";
const password = "Latefa@2024";

// Supprime les anciens admins
await User.deleteMany({ username });

// Crée l'admin en clair — le hook pre("save") du modèle le hachera automatiquement
const user = new User({ username, password });
await user.save();

console.log("✅ Compte admin recréé (par model pre-save) : admin / 123456");
process.exit();
