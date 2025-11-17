import { Router } from "express";
import { auth } from "../middlewares/auth";
import Purchase from "../models/Purchase";

const router = Router();

router.get("/purchases", auth, async (req, res) => {
  const purchases = await Purchase.find({ userId: req.user!.id }).sort({ createdAt: -1 });
  res.status(200).json(purchases);
});

export default router;
