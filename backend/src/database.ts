import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();





export const connectDB = async (): Promise<void> => {
 const uri = process.env.NODE_ENV === "test"
  ? process.env.MONGO_URI_TEST
  : process.env.MONGO_URI;

  console.log(uri)

  if (!uri) {
    console.error("MONGO_URI is missing ");
    process.exit(1);
  }

  try {
    // console.log(" Connecting to MongoDB");

    await mongoose.connect(uri, {
      dbName: process.env.DB_NAME || "sweetshop",
    });

    // console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
