// models/DecantProduct.js
import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  volume: { type: Number, required: true }, // ex: 2ml, 5ml, 10ml
  amount: { type: Number, required: true }, // ex: 50 MAD
});

const decantProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    brand: { type: String }, // ex: Dior, YSL...
    notes: { type: String }, // Homme / Femme / Unisexe
    prices: [priceSchema],
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("DecantProduct", decantProductSchema);
