import express from "express";
import { authMe } from "../controllers/userController.js";

const router = express.Router();

// Route
router.get("/me", authMe);

export default router;
