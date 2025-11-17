import { Schema, Types, model } from "mongoose";

const PurchaseSchema = new Schema(
  {
    userId: { type: Types.ObjectId,ref:"User", required: true },
    sweetId: { type: String, required: true },
    sweetName: { type: String, required: true },
    price: { type: Number, required: true },
    quantityPurchased: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default model("Purchase", PurchaseSchema);
