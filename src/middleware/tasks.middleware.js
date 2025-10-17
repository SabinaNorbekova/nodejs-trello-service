// middleware/tasksRouter.middleware.js

import pool from "../config/database.js"

export const checkTaskExists = async (req, res, next) => {
    const { task_id } = req.params
    try {
        const result = await pool.query("SELECT * FROM tasks WHERE id=$1", [task_id])
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Task not found" })
        }
        req.task = result.rows[0];
        next()
    } catch (err) {
        next(err)
    }
}

export const checkTaskOwner = (req, res, next) => {
    if (req.task.user_id !== req.user.id) {
        return res.status(403).json({ success: false, message: "Access denied" })
    }
    next()
}