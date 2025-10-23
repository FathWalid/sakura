import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  volume: { type: Number, required: true }, // ex: 50, 100, 150 ml
  amount: { type: Number, required: true }, // ex: 300 MAD
});

const zaraProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String },
    notes: { type: String },
    prices: [priceSchema], // plusieurs prix/volumes
    images: [String], // plusieurs images uploadées
  },
  { timestamps: true }
);

// 🪷 Nom du modèle différent pour collection séparée
export default mongoose.model("ZaraProduct", zaraProductSchema);
