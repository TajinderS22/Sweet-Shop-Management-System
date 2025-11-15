import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayloadData } from "../types/jwt.js";

export interface AuthRequest extends Request {
  user?: JwtPayloadData;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    console.log(decoded)
    if (
      typeof decoded === "object" &&
      "id" in decoded &&
      "role" in decoded
    ) {
      req.user = decoded as JwtPayloadData;
      return next();
    }

    return res.status(401).json({ message: "Invalid token payload" });

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
