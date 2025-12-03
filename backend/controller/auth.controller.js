import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ REGISTER USER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // 🔍 Debug: Log incoming data
    console.log("=== register ATTEMPT ===");
    console.log("name:", name);
    console.log("Email:", email);
    console.log("Password received:", password);
    console.log("Password type:", typeof password);
    console.log("Password length:", password?.length);
    // check all fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Debug: Log incoming data
    console.log("=== LOGIN ATTEMPT ===");
    console.log("Email:", email);
    console.log("Password received:", password);
    console.log("Password type:", typeof password);
    console.log("Password length:", password?.length);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🔍 Debug: Log stored hash
    console.log("Stored hash:", user.password);
    console.log("Hash type:", typeof user.password);
    console.log("Hash length:", user.password?.length);

    // 🔍 Try comparison with detailed logging
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("bcrypt.compare result:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGOUT USER
export const logout = async (req, res) => {
  try {
    // If using frontend token storage, just respond success
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// // ✅ GET USER PROFILE (requires auth middleware)
export const personalize = async (req, res) => {
  try {
    const { gender, weight, height_ft, height_in, birthday } = req.body;

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const photo = req.file ? req.file.filename : user.photo;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        gender,
        weight,
        height: `${height_ft}, ${height_in}`,
        birthday,
        profile: photo,
        photo, // <-- store file name
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Personalize error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
