import type { Request, Response } from "express";
import * as SweetService from "../services/sweets.service";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

export const addSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await SweetService.createSweet(req.body);
    res.status(201).json(sweet);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const sweets = await SweetService.getAllSweets();
  res.json(sweets);
};

export const search = async (req: Request, res: Response) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const sweets = await SweetService.searchSweets(
    name as string,
    category as string,
    minPrice ? Number(minPrice) : undefined,
    maxPrice ? Number(maxPrice) : undefined
  );

  res.json(sweets);
};

export const update = async (req: Request, res: Response) => {
  try {
    const sweet = await SweetService.updateSweet((req.params.id as string), req.body);
    res.json(sweet);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await SweetService.deleteSweet((req.params.id as string));
    res.json({ message: "Deleted successfully" });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const purchase = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const result = await SweetService.purchaseSweet(req.params.id, userId, userRole);

    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const restock = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const sweet = await SweetService.restockSweet((req.params.id as string), amount);
    res.json(sweet);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
