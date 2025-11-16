import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../src/database";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await connectDB();
});

afterEach(async () => {
  const conn = mongoose.connection;
  if (!conn || !conn.collections) return;

  const collections = conn.collections;
  const keys = Object.keys(collections);

  for (const key of keys) {
    await collections[key].deleteMany({});
  }
});


afterAll(async () => {
  await mongoose.connection.close();
});
