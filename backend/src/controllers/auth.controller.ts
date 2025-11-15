import type { Request, Response } from "express";
import * as AuthService from "../services/auth.service.js";
import type { RegisterData, LoginData } from "../types/auth.js";

export const registerUser = async (
  req: Request<RegisterData>,
  res: Response
) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginData>,
  res: Response
) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};
