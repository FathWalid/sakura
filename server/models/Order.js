import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalPrice: Number,
  customerName: String,
  customerEmail: String,
  status: { type: String, default: "En attente" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
