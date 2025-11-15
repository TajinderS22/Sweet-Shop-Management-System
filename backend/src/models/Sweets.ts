import mongoose, { Schema, Document } from "mongoose";

export interface ISweet extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const SweetSchema = new Schema<ISweet>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ISweet>("Sweet", SweetSchema);
