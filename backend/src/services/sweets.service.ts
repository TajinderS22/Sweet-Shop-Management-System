import Sweet from "../models/Sweets.js";
import type { CreateSweetData, UpdateSweetData } from "../types/sweets.js";

export const createSweet = async (data: CreateSweetData) => {
  const exists = await Sweet.findOne({ name: data.name });
  if (exists) throw new Error("Sweet already exists");

  return await Sweet.create(data);
};

export const getAllSweets = async () => {
  return Sweet.find().sort({ createdAt: -1 });
};

export const searchSweets = async (
  name?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  const query: any = {};

  // Taken help from AI chat GPT

  if (name) query.name = { $regex: name, $options: "i" };
  if (category) query.category = { $regex: category, $options: "i" };
  if (minPrice !== undefined) query.price = { $gte: minPrice };
  if (maxPrice !== undefined)
    query.price = { ...(query.price || {}), $lte: maxPrice };

  return Sweet.find(query);
};

export const updateSweet = async (id: string, data: UpdateSweetData) => {
  const updated = await Sweet.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Sweet not found");
  return updated;
};

export const deleteSweet = async (id: string) => {
  const result = await Sweet.findByIdAndDelete(id);
  if (!result) throw new Error("Sweet not found");
};

export const purchaseSweet = async (id: string) => {
  const sweet = await Sweet.findById(id);
  
  if (!sweet) throw new Error("Sweet not found");
  if (sweet.quantity <= 0) throw new Error("Out of stock");

  sweet.quantity -= 1;
  await sweet.save();
  return sweet;
};

export const restockSweet = async (id: string, amount: number) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");

  sweet.quantity += amount;
  await sweet.save();
  return sweet;
};
