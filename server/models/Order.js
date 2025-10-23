import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: false,
  },
  name: String,
  volume: Number,
  quantity: Number,
  price: Number,
  brand: { type: String, default: "Sakura" }, // 🌸 marque détectée automatiquement
});

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["En attente", "Confirmée", "Rejetée"],
      default: "En attente",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
