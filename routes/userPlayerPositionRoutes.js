import express from "express";
import { 
  createUserPlayerPosition, 
  getUserPlayerPositions, 
  updateUserPlayerPosition, 
  deleteUserPlayerPosition,
  bulkUpdateUserPlayerPositions 
} from "../controllers/userPlayerPositionController.js";

const router = express.Router();

router.post("/", createUserPlayerPosition);
router.get("/:userId", getUserPlayerPositions);
router.put("/", updateUserPlayerPosition);
router.delete("/", deleteUserPlayerPosition);
router.put("/bulk", bulkUpdateUserPlayerPositions);


export default router;
