import UserPlayerPosition from "../models/UserPlayerPosition.js";

export const createUserPlayerPosition = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, playerId, teamId, playing11Position } = req.body;
    const position = await UserPlayerPosition.createUserPlayerPosition({ userId, playerId, teamId, playing11Position });
    res.status(201).json(position);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserPlayerPositions = async (req, res) => {
  try {
    const { userId } = req.params;
    const positions = await UserPlayerPosition.getUserPlayerPositions(userId);
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserPlayerPosition = async (req, res) => {
  try {
    const { userId, playerId, teamId, playing11Position } = req.body;
    const position = await UserPlayerPosition.updateUserPlayerPosition(userId, playerId, teamId, playing11Position);
    res.status(200).json(position);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const bulkUpdateUserPlayerPositions = async (req, res) => {
    const { userId, teamId, players } = req.body; // Expecting an array of players with position
    try {
      const result = await UserPlayerPosition.bulkUpdateUserPlayerPositions(userId, teamId, players);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

export const deleteUserPlayerPosition = async (req, res) => {
  try {
    const { userId, playerId, teamId } = req.body;
    const position = await UserPlayerPosition.deleteUserPlayerPosition(userId, playerId, teamId);
    res.status(200).json(position);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
