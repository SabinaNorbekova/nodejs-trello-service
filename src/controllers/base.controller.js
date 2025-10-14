// src/controllers/base.controller.js
import pool from "../config/database.js"

export const createBaseController = (tableName) => ({
  // GET ALL
  getAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query
      const offset = (page - 1) * limit
      const total = await pool.query(`SELECT COUNT(*) FROM ${tableName}`)
      const data = await pool.query(
        `SELECT * FROM ${tableName} ORDER BY id ASC LIMIT $1 OFFSET $2`,
        [limit, offset]
      )
      res.status(200).json({
        success: true,
        total: total.rows[0].count,
        page,
        limit,
        data: data.rows,
      })
    } catch (err) {
      next(err)
    }
  },

  // GET BY ID
  getById: async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id])
      if (result.rows.length === 0)
        return res.status(404).json({ success: false, message: `${tableName} not found` })
      res.status(200).json({ success: true, data: result.rows[0] })
    } catch (err) {
      next(err)
    }
  },

  // CREATE
  create: async (req, res, next) => {
    try {
      const fields = Object.keys(req.body)
      const values = Object.values(req.body)
      const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ")

      const query = `INSERT INTO ${tableName} (${fields.join(", ")})
                     VALUES (${placeholders}) RETURNING *`

      const result = await pool.query(query, values)
      res.status(201).json({ success: true, data: result.rows[0] })
    } catch (err) {
      next(err)
    }
  },

  // UPDATE
  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const fields = Object.keys(req.body)
      const values = Object.values(req.body)
      const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ")

      const query = `UPDATE ${tableName} SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`
      const result = await pool.query(query, [...values, id])

      if (result.rows.length === 0)
        return res.status(404).json({ success: false, message: `${tableName} not found` })

      res.status(200).json({ success: true, data: result.rows[0] })
    } catch (err) {
      next(err)
    }
  },

  // DELETE
  remove: async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [id])
      if (result.rowCount === 0)
        return res.status(404).json({ success: false, message: `${tableName} not found` })

      res.status(200).json({ success: true, message: `${tableName} deleted successfully` })
    } catch (err) {
      next(err)
    }
  },
})
