import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    res.status(201).json({
      message: "Signup successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Signup failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET as string,

      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};
