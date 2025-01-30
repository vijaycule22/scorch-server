import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import userPlayerPositionRoutes from "./routes/userPlayerPositionRoutes.js";
import cors from "cors";
// Load environment variables from the .env file

const app = express();
app.use(express.json());

app.use(cors());

app.use(
    cors({
      origin: "*", // Replace with specific origin if needed
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

dotenv.config();



app.use("/api/user-player-positions", userPlayerPositionRoutes);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api", teamRoutes);
app.use("/api", playerRoutes);


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
