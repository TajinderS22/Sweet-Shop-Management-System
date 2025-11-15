import dotenv from "dotenv";
dotenv.config();   

import express from 'express';
import authRouter from './routes/auth.routes.js';
import { connectDB } from './database.js';
import sweetsRouter from "./routes/sweets.routes.js";

const port = process.env.SERVER_PORT || 3000;

const app = express();
app.use(express.json());

const startServer = async () => {
  await connectDB();

  app.use('/api', authRouter);
  app.use('/api',sweetsRouter)

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

startServer();
