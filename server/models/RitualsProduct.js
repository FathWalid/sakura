import mongoose from "mongoose";

// 💫 Sous-schema flexible pour prix et taille (S, M, L, XL, 50ml, etc.)
const priceSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true, // texte libre : "S", "M", "L", "100ml", etc.
    trim: true,
  },
  amount: {
    type: Number,
    required: true, // prix en MAD
    min: 0,
  },
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

export default mongoose.model("RitualsProduct", ritualsProductSchema);
