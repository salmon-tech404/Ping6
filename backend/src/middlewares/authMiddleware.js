import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyAccessToken = async (req, res, next) => {
  try {
    // Kiểm tra xem cấu trúc header đúng chuẩn
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Missing authorization header!!!",
      });
    }

    // Nếu header OK - lấy token từ header
    const token = authHeader.split(" ")[1];
    try {
      const playload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //kiểm tra token có hợp lệ không.
      const user = await User.findById(playload.userId).select(
        "-hashedPassword"
      );
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error("verifyAccessToken error", error);
    return res.status(500).json({ message: "Server error" });
  }
};
