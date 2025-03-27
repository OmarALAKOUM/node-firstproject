import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  authMiddleware,
  getProfile,
} from "../controllers/users.js";

const router = express.Router();
router.post("/api/users/token",authMiddleware,getProfile);
router.get("/api/users",authMiddleware, getUsers);
router.get("/api/users/:id",authMiddleware, getUser);

router.post("/api/users", createUser);
router.put("/api/users/:id",authMiddleware, updateUser);
router.delete("/api/users/:id",authMiddleware, deleteUser);
router.post("/api/users/login",loginUser)

export default router;
