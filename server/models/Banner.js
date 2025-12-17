import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    image: { type: String, required: true }, // chemin vers l’image
    link: { type: String, default: "" }, // lien optionnel (vers une promo, etc.)
    active: { type: Boolean, default: true }, // 🔹 pour activer/désactiver
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
