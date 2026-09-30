import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db/database';
import { AuthRequest } from '../middleware/auth.middleware';

export async function register(req: Request, res: Response) {
    try {
        const { email, password, display_name } = req.body;
         
    if (!email || !password || !display_name) {
            return res.status(400).json({ message: 'Email, password, and display name are required' });
            }
        const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
        
       if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (email, password_hash, display_name)
       VALUES ($1, $2, $3)
       RETURNING id, email, display_name, created_at`,
      [email, passwordHash, display_name]
    );

    const user = result.rows[0];

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      secret,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Server error during registration",
    });
  }
}
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await pool.query(
      `SELECT id, email, password_hash, display_name, created_at
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      secret,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        created_at: user.created_at,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error during login",
    });
  }
}
export async function getCurrentUser(req: AuthRequest, res: Response) {
  try {
    console.log("GET /me - userId:", req.userId);

    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const result = await pool.query(
      `SELECT id, email, display_name, created_at
       FROM users
       WHERE id = $1`,
      [req.userId]
    );

    console.log("User query result:", result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
        userId: req.userId,
      });
    }

    return res.status(200).json({
      user: result.rows[0],
    });

  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      message: "Server error while fetching current user",
    });
  }
}
