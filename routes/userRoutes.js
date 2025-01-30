import express from "express";
import {
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

export default router;
