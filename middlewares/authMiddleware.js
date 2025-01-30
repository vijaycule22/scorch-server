import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/secrets.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
