import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import sweetsRouter from "./routes/sweets.routes";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", authRouter);
app.use("/api", sweetsRouter);

export default app;
