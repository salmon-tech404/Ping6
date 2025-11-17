import express from "express";
import { signUp } from "../controllers/authController.js";
import { signIn } from "../controllers/authController.js";

//Tạo ra một router mới từ express
const router = express.Router();

// signUp
router.post("/signup", signUp);

// signIn
router.post("/signin", signIn);

export default router;
