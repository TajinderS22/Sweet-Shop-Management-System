import { Router } from "express";
import { auth } from "../middlewares/auth";
import Purchase from "../models/Purchase";
import { admin } from "../middlewares/admin";

const purchaseRouter = Router();

purchaseRouter.get("/purchases", auth, async (req, res) => {
  const purchases = await Purchase.find({ userId: req.user!.id }).sort({ createdAt: -1 });
  res.status(200).json(purchases);
});

purchaseRouter.get("/purchases/all", async (req, res) => {
  try {
    console.log('Fetching purchases...');
    
    const purchases = await Purchase.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name'); 
    
    res.status(200).json(purchases);
  } catch (err) {
    console.error('Error fetching purchases:', err);
    res.status(500).json({ message: 'Error fetching purchases' });
  }
});





export default purchaseRouter;
