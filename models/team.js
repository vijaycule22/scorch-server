import pool from "../config/db.js"; // Import the pool instead of client

export default {
  createTeam: async ({ name, city }) => {
    const client = await pool.connect(); // Get a client from the pool
    try {
      await client.query("BEGIN"); // Start the transaction

      const result = await client.query(
        "INSERT INTO teams (name, city) VALUES ($1, $2) RETURNING id, name, city",
        [name, city]
      );

      await client.query("COMMIT"); // Commit the transaction
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback on error
      throw error; // Propagate the error to the caller
    } finally {
      client.release(); // Release the client back to the pool
    }
  },

  getAllTeams: async () => {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM teams");
    return result.rows;
  },

  getTeamById: async (id) => {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM teams WHERE id = $1", [id]);
    return result.rows[0];
   
  },

  updateTeam: async (id, { name, city }) => {
    const client = await pool.connect(); // Get a client from the pool
    try {
      await client.query("BEGIN"); // Start the transaction

      const result = await client.query(
        "UPDATE teams SET name = $2, city = $3 WHERE id = $1 RETURNING id, name, city",
        [id, name, city]
      );

      await client.query("COMMIT"); // Commit the transaction
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback on error
      throw error; // Propagate the error to the caller
    } finally {
      client.release(); // Release the client back to the pool
    }
  },

  deleteTeam: async (id) => {
    const client = await pool.connect(); // Get a client from the pool
    try {
      await client.query("BEGIN"); // Start the transaction

      const result = await client.query(
        "DELETE FROM teams WHERE id = $1 RETURNING id",
        [id]
      );

      await client.query("COMMIT"); // Commit the transaction
      return result.rowCount > 0; // Return true if the row was deleted
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback on error
      throw error; // Propagate the error to the caller
    } finally {
      client.release(); // Release the client back to the pool
    }
  },
};
