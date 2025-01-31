// import pkg from "pg";
// const { Pool } = pkg;
// import dotenv from "dotenv";

// // Load environment variables from .env file
// dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   idleTimeoutMillis: 30000, // 30s before closing idle connections
//   connectionTimeoutMillis: 2000, // Wait 2s before timing out
//   keepAlive: true, // Keep connection alive
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// // Optional: Log connection success
// pool
//   .connect()
//   .then((client) => {
//     console.log("✅ Connected to PostgreSQL");
//     client.release(); // Release the client back to the pool
//   })
//   .catch((err) => console.error("❌ PostgreSQL Connection Error:", err.stack));

// export default pool;

import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

let pool;

if (!global.pool) {
  global.pool = new Pool({
    connectionString: process.env.POSTGRES_URL, // Use Vercel's env variable
    ssl: { rejectUnauthorized: false },
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
}

pool = global.pool;

export default pool;
