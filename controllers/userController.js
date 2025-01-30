import userModel from "../models/userModel.js";

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await userModel.deleteUser(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await userModel.getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await userModel.updateUser(id, name);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
