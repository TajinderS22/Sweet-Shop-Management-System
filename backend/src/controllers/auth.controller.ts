import type { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import type { RegisterData, LoginData } from "../types/auth";
import type { RegisterAdminData } from "../services/auth.service";

export const registerUser = async (
  req: Request<{}, {}, RegisterData>,
  res: Response
) => {
  try {
    const result = await AuthService.register(req.body);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const registerAdminUser = async (
  req: Request<{}, {}, RegisterAdminData>,
  res: Response
) => {
  try {
    const result = await AuthService.registerAdmin(req.body);
    return res.status(201).json(result);
  } catch (err: any) {
    if (err.message.toLowerCase().includes("secret")) {
      return res.status(401).json({ message: err.message });
    }
    return res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginData>,
  res: Response
) => {
  try {
    const result = await AuthService.login(req.body);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
};
