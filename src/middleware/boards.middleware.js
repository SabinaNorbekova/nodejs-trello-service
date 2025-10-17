// middleware/boards.middleware.js

import pool from "../config/database.js"

export const checkBoardExists = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM boards WHERE id = $1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Board not found" })
        }
        req.board = result.rows[0]
        next()
    } catch (err) {
        next(err)
    }
}

export const checkBoardOwner = (req, res, next) => {
    if (req.board.user_id !== req.user.id) {
        return res.status(403).json({ success: false, message: "Access denied" })
    }
    next()
}