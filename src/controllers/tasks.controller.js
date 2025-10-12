import pool from "../config/database.js";
import { paginate } from "../helpers/utils.js";

//   @desc Get all tasks for a specific board with pagination
//   @route GET /boards/:board_id/tasks?page=1&limit=10
export const getAllTasks = async (req, res, next) => {
  try {
    const { board_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const countResult = await pool.query(
      "SELECT COUNT(*) AS total FROM tasks WHERE board_id = $1",
      [board_id]
    );
    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    const dataResult = await pool.query(
      `SELECT * FROM tasks WHERE board_id = $1 ORDER BY id ASC LIMIT $2 OFFSET $3`,
      [board_id, limit, offset]
    );

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages,
      data: dataResult.rows,
    });
  } catch (err) {
    next(err);
  }
};


//   @desc Get a single task by ID
//   @route GET /boards/:board_id/tasks/:task_id
export const getTaskById = async (req, res, next) => {
  try {
    const { board_id, task_id } = req.params;
    const result = await pool.query(
      "SELECT * FROM tasks WHERE board_id = $1 AND id = $2",
      [board_id, task_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};


//   @desc Create a new task for a board
//   @route POST /boards/:board_id/tasks
export const createTask = async (req, res, next) => {
  try {
    const { board_id } = req.params;
    const { title, description, user_id, column_id } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description, user_id, board_id, column_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description || null, user_id || null, board_id, column_id || null]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};


//   @desc Update a task
//   @route PUT /boards/:board_id/tasks/:task_id
export const updateTask = async (req, res, next) => {
  try {
    const { board_id, task_id } = req.params;
    const { title, description, user_id, column_id } = req.body;

    const result = await pool.query(
      `UPDATE tasks SET
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         user_id = COALESCE($3, user_id),
         column_id = COALESCE($4, column_id)
       WHERE board_id = $5 AND id = $6
       RETURNING *`,
      [title, description, user_id, column_id, board_id, task_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};


//   @desc Delete a task
//   @route DELETE /boards/:board_id/tasks/:task_id
export const deleteTask = async (req, res, next) => {
  try {
    const { board_id, task_id } = req.params;
    const result = await pool.query(
      "DELETE FROM tasks WHERE board_id = $1 AND id = $2",
      [board_id, task_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};
