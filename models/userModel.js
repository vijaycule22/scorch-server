import { db } from "@vercel/postgres";

export default {
  getUserByEmail: async (email) => {
    try {
      await db.query("BEGIN");
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      await db.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  },

  createUser: async ({ email, password, name, roleId }) => {
    try {
      await db.query("BEGIN");

      const result = await db.query(
        "INSERT INTO users (email, password, name, role_id) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role_id",
        [email, password, name, roleId]
      );

      await db.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  },

  getUserById: async (id) => {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  getAllUsers: async () => {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
  },

  updateUser: async (id, name) => {
    try {
      await db.query("BEGIN");

      const result = await db.query(
        "UPDATE users SET name = $2 WHERE id = $1 RETURNING id, name",
        [id, name]
      );

      await db.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      await db.query("BEGIN");

      const result = await db.query(
        "DELETE FROM users WHERE id = $1 RETURNING id",
        [id]
      );

      await db.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  },
};
