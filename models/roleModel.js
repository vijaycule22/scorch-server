import { db } from "@vercel/postgres";

export default {
  getRoleIdByName: async (name) => {
    try {
      await db.query("BEGIN"); // Start transaction

      const result = await db.query("SELECT id FROM roles WHERE name = $1", [
        name,
      ]);

      await db.query("COMMIT"); // Commit transaction
      return result.rows[0]?.id;
    } catch (error) {
      await db.query("ROLLBACK"); // Rollback on error
      throw error;
    }
  },
};
