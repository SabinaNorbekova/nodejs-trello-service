// src/controllers/board.controller.js
import pool from "../config/database.js"

export const getBoards = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM boards ORDER BY id ASC")
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getBoardById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM boards WHERE id = $1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Board not found" })
        }
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const createBoard = async (req, res) => {
    try {
        const { title, columns } = req.body
        const result = await pool.query(
            "INSERT INTO boards (title, columns) VALUES ($1, $2) RETURNING *",
            [title, columns]
        );
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateBoard = async (req, res) => {
    try {
        const { id } = req.params
        const { title, columns } = req.body
        const result = await pool.query(
            "UPDATE boards SET title = $1, columns = $2 WHERE id = $3 RETURNING *",
            [title, columns, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Board not found" })
        }
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteBoard = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM boards WHERE id = $1", [id])
        res.json({ message: "Board deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
