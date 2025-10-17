//middleware/users.middlware.js
import pool from "../config/database.js"

export const checkUserExists = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await pool.query("SELECT * FROM users WHERE id=$1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        req.userData = result.rows[0]
        next()
    } catch (err) {
        next(err)
    }
}

export const checkUserAccess = (req, res, next) => {
    if (req.user.id !== req.userData.id) {
        return res.status(403).json({ success: false, message: "Access denied" })
    }
    next()
}