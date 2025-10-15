// src/controllers/boards.controller.js
import BaseController from "./base.controller.js"
import pool from "../config/database.js"

class BoardController extends BaseController {
    constructor() {
        super("boards")
    }

    create = async (req, res, next) => {
        try {
            req.body.user_id = req.user.id

            const fields = Object.keys(req.body);
            const values = Object.values(req.body);
            const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

            const query = `
        INSERT INTO ${this.tableName} (${fields.join(", ")})
        VALUES (${placeholders})
        RETURNING *
      `;

            const result = await pool.query(query, values);
            res.status(201).json({ success: true, data: result.rows[0] });
        } catch (err) {
            next(err);
        }
    }


    getAll = async (req, res, next) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const countResult = await pool.query(`SELECT COUNT(*) AS total FROM ${this.tableName} WHERE user_id = $1`, [req.user.id]);
            const total = parseInt(countResult.rows[0].total);
            const totalPages = Math.ceil(total / limit);

            const dataResult = await pool.query(
                `SELECT * FROM ${this.tableName} WHERE user_id = $1 ORDER BY id ASC LIMIT $2 OFFSET $3`,
                [req.user.id, limit, offset]
            );

            res.status(200).json({ success: true, page, limit, total, totalPages, data: dataResult.rows });
        } catch (err) {
            next(err);
        }
    }
}

export const boardController = new BoardController();  