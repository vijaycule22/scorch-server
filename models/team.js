import { db } from "@vercel/postgres";

export default {
  createTeam: async ({ name, city }) => {
    try {
      await db.query("BEGIN"); // Start transaction

      const result = await db.query(
        "INSERT INTO teams (name, city) VALUES ($1, $2) RETURNING id, name, city",
        [name, city]
      );

      await db.query("COMMIT"); // Commit transaction
      return result.rows[0];
    } catch (error) {
      await db.query("ROLLBACK"); // Rollback on error
      throw error;
    }
  },

  getAllTeams: async () => {
    const result = await db.query("SELECT * FROM teams");
    return result.rows;
  },

  getTeamById: async (id) => {
    const result = await db.query("SELECT * FROM teams WHERE id = $1", [id]);
    return result.rows[0];
  },

  updateTeam: async (id, { name, city }) => {
    try {
      await db.query("BEGIN"); // Start transaction

      const result = await db.query(
        "UPDATE teams SET name = $2, city = $3 WHERE id = $1 RETURNING id, name, city",
        [id, name, city]
      );

      await db.query("COMMIT"); // Commit transaction
      return result.rows[0];
    } catch (error) {
      await db.query("ROLLBACK"); // Rollback on error
      throw error;
    }
  },

  deleteTeam: async (id) => {
    try {
      await db.query("BEGIN"); // Start transaction

      const result = await db.query(
        "DELETE FROM teams WHERE id = $1 RETURNING id",
        [id]
      );

      await db.query("COMMIT"); // Commit transaction
      return result.rowCount > 0; // Return true if a row was deleted
    } catch (error) {
      await db.query("ROLLBACK"); // Rollback on error
      throw error;
    }
  },
};
