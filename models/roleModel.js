import pool from "../config/db.js"; // Import the pool instead of client

export default {
  getRoleIdByName: async (name) => {
    const client = await pool.connect(); // Get a client from the pool
    try {
      await client.query("BEGIN"); // Start the transaction

      const result = await client.query(
        "SELECT id FROM roles WHERE name = $1",
        [name]
      );

      await client.query("COMMIT"); // Commit the transaction
      return result.rows[0]?.id;
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback on error
      throw error; // Propagate the error to the caller
    } finally {
      client.release(); // Release the client back to the pool
    }
  },
};
