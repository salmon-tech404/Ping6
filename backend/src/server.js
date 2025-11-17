import express from "express";
import dotenv from "dotenv";
import connectDB from "./libs/db.js";
import authRoute from "./routes/authRoute.js";

// load env libs
dotenv.config();

const app = express();

// Lấy giá trị SERVER_PORT từ biến môi trường
const SERVER_PORT = process.env.SERVER_PORT;

// middlewares xử lý các request body có định dạng JSON
app.use(express.json());

// Public routes
app.use("/api/auth", authRoute);

// Private routes

// Connect to DB
connectDB().then(() => {
  // run server
  app.listen(SERVER_PORT, () => {
    console.log(`✅ Server đang chạy trên cổng ${SERVER_PORT}`);
  });
});
