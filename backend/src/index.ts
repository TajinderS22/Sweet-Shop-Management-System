import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./database";

const port = process.env.SERVER_PORT || 3000;

async function startServer() {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
