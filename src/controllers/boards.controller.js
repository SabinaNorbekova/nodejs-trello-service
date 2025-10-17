// src/controllers/boards.controller.js
import pool from "../config/database.js"
import { paginate } from "../helpers/utils.js"

//   @desc Get all boards with pagination
//   @route GET /boards?page=1&limit=10
export const getAllBoards = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const result = await paginate(pool, "boards", page, limit)
        res.status(200).json({ success: true, ...result })
    } catch (err) {
        next(err)
    }
}

//   @desc Get single board by ID
//   @route GET /boards/:id
export const getBoardById = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM boards WHERE id = $1", [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Board not found" })
        }

        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
        next(err)
    }
}

//   @desc Create a new board
//   @route POST /boards
export const createBoard = async (req, res, next) => {
    try {
        const { title, columns = [] } = req.body

        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required" })
        }

        const result = await pool.query(
            "INSERT INTO boards (title, columns) VALUES ($1, $2) RETURNING *",
            [title, columns]
        );

        res.status(201).json({ success: true, data: result.rows[0] })
    } catch (err) {
        next(err)
    }
}

//   @desc Update an existing board
//   @route PUT /boards/:id
export const updateBoard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, columns = [] } = req.body

        const result = await pool.query(
            "UPDATE boards SET title = $1, columns = $2 WHERE id = $3 RETURNING *",
            [title, columns, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Board not found" })
        }

        res.status(200).json({ success: true, data: result.rows[0] })
    } catch (err) {
        next(err)
    }
}

//   @desc Delete board by ID
//   @route DELETE /boards/:id
export const deleteBoard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM boards WHERE id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Board not found" })
        }

        res.status(200).json({ success: true, message: "Board deleted successfully" })
    } catch (err) {
        next(err)
    }
}

//todo : crudni dynamic qilish