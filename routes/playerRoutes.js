import express from "express";
import playerController from "../controllers/playerController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(verifyToken);

// Create a player
router.post("/players", playerController.createPlayer);

// Get all players
router.get("/players", playerController.getAllPlayers);

// Get a player by ID
router.get("/players/:id", playerController.getPlayerById);

// Update a player
router.put("/players/:id", playerController.updatePlayer);

// Delete a player
router.delete("/players/:id", playerController.deletePlayer);

// Get players of a specific team
router.get("/teams/:teamId/players", playerController.getPlayerByTeamId);

// Additional routes (optional)

// Set captain for a player (assuming a PUT request to update captaincy)
router.put("/players/:playerId/captain", playerController.setCaptain);

// Update playing status for a player (assuming a PATCH request)
router.patch(
  "/players/:playerId/playing",
  playerController.updatePlayingStatus
);

export default router;
