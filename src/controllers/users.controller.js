import pool from "../config/database.js";
import { paginate } from "../helpers/utils.js";
import bcrypt from "bcrypt";


  // @desc Get all users with pagination (password hidden)
  // @route GET /users?page=1&limit=10
 export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await paginate(pool, "users", page, limit);

    result.data = result.data.map(({ password, ...user }) => user);

    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};


  // @desc Get user by ID (password hidden)
  // @route GET /users/:id

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { password, ...user } = result.rows[0];
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};


//   @desc Register a new user (password hashed)
//   @route POST /users
 
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

//  @desc Update user
//  @route PUT /users/:id
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const result = await pool.query(
      "UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password) WHERE id = $4 RETURNING id, name, email",
      [name, email, hashedPassword, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};


//   @desc Delete user (set user_id = NULL in tasks)
//   @route DELETE /users/:id
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await pool.query("UPDATE tasks SET user_id = NULL WHERE user_id = $1", [id]);
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
