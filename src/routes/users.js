import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  authMiddleware,
} from "../controllers/users.js";

const router = express.Router();

router.get("/api/users",authMiddleware, getUsers);
router.get("/api/users/:id", getUser);
router.post("/api/users", createUser);
router.put("/api/users/:id", updateUser);
router.delete("/api/users/:id", deleteUser);
router.post("/api/users/login",loginUser)

export default router;
