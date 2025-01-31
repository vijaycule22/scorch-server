import { db } from "@vercel/postgres";

export default {
  createUserPlayerPosition: async ({
    userId,
    playerId,
    teamId,
    playing11Position,
  }) => {
    try {
      await db.query("BEGIN");

      // Check if the player exists in the given team
      const playerCheck = await db.query(
        "SELECT id FROM players WHERE id = $1 AND team_id = $2",
        [playerId, teamId]
      );
      if (playerCheck.rows.length === 0) {
        throw new Error("Player does not exist in the given team.");
      }

      // Set is_playing = false for any other player in this position
      await db.query(
        `UPDATE user_player_positions 
         SET is_playing = false 
         WHERE team_id = $1 AND playing11_position = $2 AND user_id = $3`,
        [teamId, playing11Position, userId]
      );

      // Insert the new player with is_playing = true
      const result = await db.query(
        `INSERT INTO user_player_positions (user_id, player_id, team_id, playing11_position, is_playing) 
         VALUES ($1, $2, $3, $4, TRUE) RETURNING *`,
        [userId, playerId, teamId, playing11Position]
      );

      await db.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  },

  getUserPlayerPositions: async (userId) => {
    const result = await db.query(
      "SELECT * FROM user_player_positions WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  },

  updateUserPlayerPosition: async (
    userId,
    playerId,
    teamId,
    playing11Position
  ) => {
    try {
      await db.query("BEGIN");

      // Check if the player exists in the given team
      const playerCheck = await db.query(
        "SELECT id FROM players WHERE id = $1 AND team_id = $2",
        [playerId, teamId]
      );
      if (playerCheck.rows.length === 0) {
        throw new Error("Player does not exist in the given team.");
      }

      // Set is_playing = false for any other player in this position
      await db.query(
        `UPDATE user_player_positions 
         SET is_playing = false 
         WHERE team_id = $1 AND playing11_position = $2 AND user_id = $3`,
        [teamId, playing11Position, userId]
      );

      // Update player's position and set is_playing = true
      const result = await db.query(
        `UPDATE user_player_positions 
         SET playing11_position = $4, is_playing = TRUE 
         WHERE user_id = $1 AND player_id = $2 AND team_id = $3 RETURNING *`,
        [userId, playerId, teamId, playing11Position]
      );

      await db.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  },

  deleteUserPlayerPosition: async (userId, playerId, teamId) => {
    try {
      await db.query("BEGIN");
      const result = await db.query(
        `DELETE FROM user_player_positions WHERE user_id = $1 AND player_id = $2 AND team_id = $3 RETURNING *`,
        [userId, playerId, teamId]
      );
      await db.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  },

  bulkUpdateUserPlayerPositions: async (userId, teamId, players) => {
    try {
      await db.query("BEGIN");

      for (const player of players) {
        const { playerId, playing11Position } = player;

        // Ensure position is within valid range (1 to 11)
        if (playing11Position < 1 || playing11Position > 11) {
          throw new Error(
            "Invalid playing11_position. It must be between 1 and 11."
          );
        }

        // Check if the player exists in the team before adding
        const playerCheck = await db.query(
          "SELECT id FROM players WHERE id = $1 AND team_id = $2",
          [playerId, teamId]
        );
        if (playerCheck.rows.length === 0) {
          throw new Error(
            `Player ${playerId} does not exist in the given team.`
          );
        }

        // Insert or update the player
        await db.query(
          `INSERT INTO user_player_positions (user_id, player_id, team_id, playing11_position, is_playing) 
           VALUES ($1, $2, $3, $4, TRUE) 
           ON CONFLICT (user_id, player_id, team_id) 
           DO UPDATE SET playing11_position = $4, is_playing = TRUE`,
          [userId, playerId, teamId, playing11Position]
        );
      }

      await db.query("COMMIT");
      return { success: true };
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  },
};
