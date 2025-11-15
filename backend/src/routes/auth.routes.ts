import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";


const authRouter = Router();

// user Signup route handler
authRouter.post("/auth/register", registerUser);

// user Login route handler
authRouter.post("/auth/login", loginUser);

export default authRouter;
