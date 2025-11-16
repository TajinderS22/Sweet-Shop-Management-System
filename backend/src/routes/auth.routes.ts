import { Router } from "express";
import { loginUser, registerAdminUser, registerUser } from "../controllers/auth.controller.js";


const authRouter = Router();

// user Signup route handler
authRouter.post("/auth/register", registerUser);

authRouter.post("/auth/register-admin",registerAdminUser)

// user Login route handler
authRouter.post("/auth/login", loginUser);

export default authRouter;
