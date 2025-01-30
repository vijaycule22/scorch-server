import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/secrets.js";

export const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, jwtSecret, { expiresIn });
};
