// import pkg from "pg";
// const { Client } = pkg;
// import dotenv from "dotenv";

// // Load environment variables from the .env file
// dotenv.config();

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// client
//   .connect()
//   .then(() => console.log("Connected to PostgreSQL"))
//   .catch((err) => console.error("Connection error", err.stack));

// export default client;


import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL  + "?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

// Optional: Log connection success
pool
  .connect()
  .then((client) => {
    console.log("✅ Connected to PostgreSQL");
    client.release(); // Release the client back to the pool
  })
  .catch((err) => console.error("❌ PostgreSQL Connection Error:", err.stack));

export default pool;
