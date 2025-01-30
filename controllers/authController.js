import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { hashPassword, validatePassword } from "../utils/passwordUtils.js";
import { generateToken } from "../utils/tokenUtils.js";
import userModel from "../models/userModel.js";
import roleModel from "../models/roleModel.js";

export const signup = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email is already registered" });

    const hashedPassword = await hashPassword(password);
    const roleId = await roleModel.getRoleIdByName(role || "user");

    const newUser = await userModel.createUser({
      email,
      password: hashedPassword,
      name,
      roleId,
    });
    const token = generateToken({ id: newUser.id, role: role || "user" });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) return res.status(401).json({ message: "User does not exist" });

    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken({ id: user.id, role: user.role_id });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
