import Team from "../models/team.js";

export default {
  createTeam: async (req, res) => {
    try {
      const team = await Team.createTeam(req.body);
      res.status(201).json(team);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllTeams: async (req, res) => {
    try {
      const teams = await Team.getAllTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTeamById: async (req, res) => {
    try {
      const team = await Team.getTeamById(req.params.id);
      if (!team) return res.status(404).json({ error: "Team not found" });
      res.json(team);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTeam: async (req, res) => {
    try {
      const updatedTeam = await Team.updateTeam(req.params.id, req.body);
      res.json(updatedTeam);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteTeam: async (req, res) => {
    try {
      const success = await Team.deleteTeam(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
