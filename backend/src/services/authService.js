const User = require("../models/User");

async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error("Email already registered");
    error.status = 400;
    throw error;
  }
  const user = await User.create({ name, email, password });
  return user;
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }
  user.password = undefined;
  return user;
}

async function getUserById(id) {
  const user = await User.findById(id);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return user;
}

module.exports = { registerUser, loginUser, getUserById };
