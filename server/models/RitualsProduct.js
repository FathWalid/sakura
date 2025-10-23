import mongoose from "mongoose";

// 💫 Sous-schema pour les prix selon la taille (S, M, L)
const priceSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    enum: ["S", "M", "L"], // uniquement S, M, L
  },
  amount: { type: Number, required: true }, // ex: 150, 250, 350 MAD
});

const ritualsProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String },
    notes: { type: String },
    prices: [priceSchema], // plusieurs tailles/prix
    images: [String], // plusieurs images uploadées
  },
  { timestamps: true }
);

// 🌸 Collection séparée pour Rituals
export default mongoose.model("RitualsProduct", ritualsProductSchema);
