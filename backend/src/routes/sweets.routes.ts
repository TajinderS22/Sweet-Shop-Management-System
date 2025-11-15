import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";
import { validate } from "../middlewares/sweets.validation.middleware.js";
import {
  createSweetSchema,
  updateSweetSchema,
} from '../validations/sweets.validation.js';

import {
  addSweet,
  getAll,
  search,
  update,
  remove,
  purchase,
  restock,
} from "../controllers/sweets.controllers.js";

const sweetsRouter = Router();

// Only admin is allowed to create sweets
sweetsRouter.post("/sweets", auth, validate(createSweetSchema), addSweet);

// get All sweets From Server
sweetsRouter.get("/sweets", auth, getAll);

sweetsRouter.get("/sweets/search", auth, search);

// Admin only protected route 
sweetsRouter.put("/sweets/:id", auth, admin, validate(updateSweetSchema), update);

// Admin only protected route 
sweetsRouter.delete("/sweets/:id", auth, admin, remove);


sweetsRouter.post("/sweets/:id/purchase", auth, purchase);

// Admin only protected route 
sweetsRouter.post("/sweets/:id/restock", auth, admin, restock);

export default sweetsRouter;
