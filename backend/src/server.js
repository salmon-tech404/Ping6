import express from "express";
import dotenv from "dotenv";
import connectDB from "./libs/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import { verifyAccessToken } from "./middlewares/authMiddleware.js";
import cors from "cors";

// load env libs
dotenv.config();

const app = express();

// Đặt CORS
app.use(
  cors({
    origin: process.env.CLENT_URL,
    credentials: true,
  })
);

// Lấy giá trị SERVER_PORT từ biến môi trường
const SERVER_PORT = process.env.SERVER_PORT;

// middlewares xử lý các request body có định dạng JSON
app.use(express.json());

// Public routes
app.use("/api/auth", authRoute);

// Private routes
app.use(verifyAccessToken);
app.use("/api/users", userRoute);

// Connect to DB
connectDB().then(() => {
  // run server
  app.listen(SERVER_PORT, () => {
    console.log(`✅ Server đang chạy trên cổng ${SERVER_PORT}`);
  });
});
