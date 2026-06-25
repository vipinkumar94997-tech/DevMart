import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

connectDB();

app.listen(5000, () => {
  console.log("Server running on 5000");
});
