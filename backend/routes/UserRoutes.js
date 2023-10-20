import express from "express";
import {
  authUser,
  registerUser,
  logout,
  getProfile,
  updatProfile,
} from "../controller/userController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logout);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updatProfile);

export default router;
